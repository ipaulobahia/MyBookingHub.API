import { Injectable } from "@nestjs/common";
import { Service } from "@prisma/client";
import { PrismaService } from "src/prisma/services/prisma.service";
import { IServiceRepository } from "./service-repository.interface";

@Injectable()
export class ServiceRepository implements IServiceRepository {
  constructor(private prisma: PrismaService) { }

  async findOne(serviceId: string, businessId: string): Promise<Service | null> {
    return await this.prisma.service.findUnique({
      where: { id: serviceId, businessId }
    })
  }
}