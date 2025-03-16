import { Service } from "@prisma/client";

export interface IServiceRepository {
  findOne(serviceId: string, businessId: string): Promise<Service | null>
}