export interface INotification {
  id: string
  read_id: string
  title: string
  message: string
  created_at: string
  is_read: boolean
  read_at?: string
}
