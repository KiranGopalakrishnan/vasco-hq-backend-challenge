export interface Entity<ExposedFields> {
  // This is not intended to expose all fields of a entity
  // which in my opinion will render the use of an entity encapsulation pointless
  // This method is intended as a way to let the domain expose fields it wants to to outside consumers of the domain
  getFields(): ExposedFields
}