import { ActivityType } from '../enums'
import {
  ActivityZone,
  Comment,
  DetailedActivity,
  Lap,
  SummaryActivity,
  SummaryAthlete,
} from '../models'
import { Request } from '../request'

type CreateActivityRequest = {
  name: string
  type: ActivityType
  start_date_local: string
  elapsed_time: number
  description?: string
  distance?: number
  trainer?: number
  commute?: number
}

type GetActivityByIdRequest = {
  id: number
  include_all_efforts?: boolean
}

type GetCommentsByActivityIdRequest = {
  id: number
  page?: number
  per_page?: number
}

type GetKudoersByActivityIdRequest = {
  id: number
  page?: number
  per_page?: number
}

type GetLapsByActivityIdRequest = {
  id: number
}

type GetPhotosByActivityIdRequest = {
  id: number
  photo_sources?: boolean
  size?: number
}

type GetZonesByActivityIdRequest = {
  id: number
}

type GetLoggedInAthleteActivitiesRequest = {
  before?: number
  after?: number
  page?: number
  per_page?: number
}

type UpdateActivityByIdRequest = {
  id: number
  name?: string
  type?: ActivityType
  start_date_local?: string
  elapsed_time?: number
  description?: string
  distance?: number
  trainer?: number
  commute?: number
}

export class Activities {
  private readonly request: Request

  constructor(request: Request) {
    this.request = request
  }

  async createActivity(
    params: CreateActivityRequest,
    access_token?: string,
  ): Promise<DetailedActivity> {
    return await this.request.makeApiRequest<DetailedActivity>(
      'post',
      '/activities',
      { body: params, access_token },
    )
  }

  async getActivityById(
    params: GetActivityByIdRequest,
    access_token?: string,
  ): Promise<DetailedActivity> {
    const { id, ...query } = params
    return await this.request.makeApiRequest<DetailedActivity>(
      'get',
      `/activities/${id}`,
      { query, access_token },
    )
  }

  async getCommentsByActivityId(
    params: GetCommentsByActivityIdRequest,
    access_token?: string,
  ): Promise<Comment[]> {
    const { id, ...query } = params
    return await this.request.makeApiRequest<Comment[]>(
      'get',
      `/activities/${id}/comments`,
      { query, access_token },
    )
  }

  async getKudoersByActivityId(
    params: GetKudoersByActivityIdRequest,
    access_token?: string,
  ): Promise<SummaryAthlete[]> {
    const { id, ...query } = params
    return await this.request.makeApiRequest<SummaryAthlete[]>(
      'get',
      `/activities/${id}/kudos`,
      { query, access_token },
    )
  }

  async getLapsByActivityId(
    params: GetLapsByActivityIdRequest,
  ): Promise<Lap[]> {
    const { id, ...query } = params
    return await this.request.makeApiRequest<Lap[]>(
      'get',
      `/activities/${id}/laps`,
      { query },
    )
  }

  async getPhotosByActivityId(
    params: GetPhotosByActivityIdRequest,
    access_token?: string,
  ): Promise<Lap[]> {
    const { id, ...query } = params
    return await this.request.makeApiRequest<Lap[]>(
      'get',
      `/activities/${id}/photos`,
      { query, access_token },
    )
  }

  async getLoggedInAthleteActivities(
    params?: GetLoggedInAthleteActivitiesRequest,
  ): Promise<SummaryActivity[]> {
    return await this.request.makeApiRequest<SummaryActivity[]>(
      'get',
      '/athlete/activities',
      { query: params },
    )
  }

  async getZonesByActivityId(
    params: GetZonesByActivityIdRequest,
    access_token?: string,
  ): Promise<ActivityZone[]> {
    const { id, ...query } = params
    return await this.request.makeApiRequest<ActivityZone[]>(
      'get',
      `/activities/${id}/zones`,
      { query, access_token },
    )
  }

  async updateActivityById(
    params: UpdateActivityByIdRequest,
    access_token?: string,
  ): Promise<DetailedActivity> {
    const { id, ...body } = params
    return await this.request.makeApiRequest<DetailedActivity>(
      'put',
      `/activities/${id}`,
      { body, access_token },
    )
  }
}
