const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getLeads = async (req, res, next) => {
  try {
    const leads = await prisma.lead.findMany({
      where: { ownerId: req.user.userId, deletedAt: null },
      orderBy: { createdAt: 'desc' }
    });
    res.json({
      success: true,
      data: leads,
      error: null,
      meta: { timestamp: new Date().toISOString(), total: leads.length }
    });
  } catch (error) {
    next(error);
  }
};

const createLead = async (req, res, next) => {
  try {
    const { first_name, last_name, phone_number, source } = req.body;
    
    if (!first_name || !phone_number) {
       return res.status(400).json({ 
         success: false, 
         data: null, 
         error: { code: 'VALIDATION_ERROR', message: 'First name and phone number are required' }, 
         meta: { timestamp: new Date().toISOString() }
       });
    }

    const newLead = await prisma.lead.create({
      data: {
        first_name,
        last_name,
        phone_number,
        source: source || 'Manual',
        ownerId: req.user.userId
      }
    });

    res.status(201).json({
      success: true,
      data: newLead,
      error: null,
      meta: { timestamp: new Date().toISOString() }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLeads, createLead };
