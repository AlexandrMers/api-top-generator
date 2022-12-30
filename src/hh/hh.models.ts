export interface HhResponse {
  items: Item[]
  found: number
  pages: number
  per_page: number
  page: number
  clusters: Cluster[]
}

export interface Item {
  id: string
  premium: boolean
  name: string
  department: any
  has_test: boolean
  response_letter_required: boolean
  area: Area
  salary: Salary
  type: Type
  address: any
  response_url: any
  sort_point_distance: any
  published_at: string
  created_at: string
  archived: boolean
  apply_alternate_url: string
  insider_interview: any
  url: string
  adv_response_url: string
  alternate_url: string
  relations: any[]
  employer: Employer
  snippet: Snippet
  contacts: any
  schedule: Schedule
  working_days: any[]
  working_time_intervals: any[]
  working_time_modes: any[]
  accept_temporary: boolean
}

export interface Area {
  id: string
  name: string
  url: string
}

export interface Salary {
  from: number
  to: number
  currency: string
  gross: boolean
}

export interface Type {
  id: string
  name: string
}

export interface Employer {
  id: string
  name: string
  url: string
  alternate_url: string
  logo_urls: any
  vacancies_url: string
  trusted: boolean
}

export interface Snippet {
  requirement: string
  responsibility: string
}

export interface Schedule {
  id: string
  name: string
}

export interface Cluster {
  name: string
  id: string
  items: ClusterElement[]
}

export interface ClusterElement {
  name: string
  url: string
  count: number
}
