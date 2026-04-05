const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const register = async (req, res, next) => {
  try {
    const { email, name, password, roleName = 'User' } = req.body;
    
    if (!email || !name || !password) {
      return res.status(400).json({ 
        success: false, 
        data: null, 
        error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' }, 
        meta: { timestamp: new Date().toISOString() }
      });
    }

    let role = await prisma.role.findUnique({ where: { name: roleName } });
    if (!role) {
      role = await prisma.role.create({ data: { name: roleName } });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, passwordHash: hashedPassword, roleId: role.id }
    });
    
    const { passwordHash, ...userWithoutPassword } = user;
    res.status(201).json({ 
      success: true, 
      data: userWithoutPassword, 
      error: null, 
      meta: { timestamp: new Date().toISOString() }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ 
        success: false, 
        data: null, 
        error: { code: 'VALIDATION_ERROR', message: 'Email already exists' }, 
        meta: { timestamp: new Date().toISOString() }
      });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
       return res.status(400).json({ 
         success: false, 
         data: null, 
         error: { code: 'VALIDATION_ERROR', message: 'Email and password required' }, 
         meta: { timestamp: new Date().toISOString() }
       });
    }
    
    const user = await prisma.user.findUnique({ where: { email }, include: { role: true } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ 
        success: false, 
        data: null, 
        error: { code: 'UNAUTHORIZED', message: 'Invalid credentials' }, 
        meta: { timestamp: new Date().toISOString() }
      });
    }
    
    const token = jwt.sign(
      { userId: user.id, role: user.role.name }, 
      process.env.JWT_SECRET || 'supersecret_dev_key', 
      { expiresIn: '1d' }
    );
    
    const { passwordHash, ...userWithoutPassword } = user;
    res.json({ 
      success: true, 
      data: { user: userWithoutPassword, token }, 
      error: null, 
      meta: { timestamp: new Date().toISOString() }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
