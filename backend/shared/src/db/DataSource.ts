export interface DataSource<T> {
  read():Promise<T>
}