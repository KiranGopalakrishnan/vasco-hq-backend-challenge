export interface EntityToDTOTransformer<T,U> {
  toDTO(entity:T):U
}