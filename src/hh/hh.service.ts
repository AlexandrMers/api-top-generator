import { Injectable, Logger } from '@nestjs/common'

// Services
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'

// Constants
import {
  API_HH_RU_URLS,
  CLUSTER_FIND_ERROR,
  CLUSTER_SALARY_ID,
} from './hh.constants'

// Types
import { HhResponse } from './hh.interfaces'
import { HhDataDto } from '../top-page/dto/create-top-page.dto'

@Injectable()
export class HhService {
  apiHost: string

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiHost = configService.get('API_HOST_HH_RU') ?? ''
  }

  async get(text: string) {
    try {
      const response = await this.httpService
        .get<HhResponse>(`${this.apiHost}/${API_HH_RU_URLS.VACANCIES}`, {
          params: {
            text,
            clusters: true,
          },
        })
        .toPromise()

      return this.parseData(response?.data ?? null)
    } catch (e) {
      Logger.error(e)
    }
  }

  private parseData(data: HhResponse | null): HhDataDto | null {
    if (!data) return null

    const salaryCluster = data.clusters.find(
      (cluster) => cluster.id === CLUSTER_SALARY_ID,
    )

    if (!salaryCluster) {
      throw new Error(CLUSTER_FIND_ERROR)
    }

    // first salary from list
    const juniorSalary = this.getSalaryFromString(salaryCluster.items[1].name)
    // middle salary from list
    const middleSalary = this.getSalaryFromString(
      salaryCluster.items[Math.ceil(salaryCluster.items.length / 2)].name,
    )
    // last salary from list
    const seniorSalary = this.getSalaryFromString(
      salaryCluster.items[salaryCluster.items.length - 1].name,
    )

    return {
      count: data.found,
      juniorSalary,
      middleSalary,
      seniorSalary,
      updatedAt: new Date(),
    }
  }

  private getSalaryFromString(salary: string): number {
    const numberRegExp = /(\d+)/g
    const result = salary.match(numberRegExp)
    if (!result) return 0

    return Number(result[0])
  }
}
