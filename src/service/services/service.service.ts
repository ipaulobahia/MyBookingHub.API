import { Inject, Injectable } from "@nestjs/common";
import { IServiceRepository } from "../repositories/service-repository.interface";

@Injectable()
export class ServiceService {
  constructor(
    @Inject('SERVICE_REPOSITORY')
    private readonly serviceRepository: IServiceRepository
  ) { }

  async findOne(serviceId: string, businessId: string) {
    // TODO: Validar se o estabelecimento existe.
    // const business = await this.authClient(businessId)

    // if (!business) {
    //   throw new NotFoundException('Estabelecimento não encontrado')
    // }

    return await this.serviceRepository.findOne(serviceId, businessId)
  }
}