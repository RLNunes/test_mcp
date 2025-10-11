import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  expertise: string | null;
  active: boolean;
  brands: {
    id: string;
    name: string;
    category: string;
  }[];
}

// Service layer - Single Responsibility Principle
class AgentService {
  async getAllAgents(): Promise<Agent[]> {
    const agents = await prisma.agent.findMany({
      include: {
        brands: {
          include: {
            brand: {
              select: {
                id: true,
                name: true,
                category: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    // Transform database model to API response format
    return agents.map(agent => ({
      id: agent.id,
      name: agent.name,
      email: agent.email,
      phone: agent.phone,
      expertise: agent.expertise,
      active: agent.active,
      brands: agent.brands.map(ab => ab.brand),
    }));
  }
}

const agentService = new AgentService();

export async function GET() {
  try {
    const agents = await agentService.getAllAgents();
    return NextResponse.json({ success: true, data: agents });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}
