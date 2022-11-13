import {EntityToDTOTransformer} from "../common/EntityToDTOTransformer";
import {QuarterlyTargetEntity} from "../domain/entities/QuarterlyTargetEntity";
import {QuarterlyTargetDTO} from "./QuarterlyTargetDTO";


export class PerQuarterDTOTransformer implements EntityToDTOTransformer<QuarterlyTargetEntity, QuarterlyTargetDTO> {
  toDTO(entity: QuarterlyTargetEntity): QuarterlyTargetDTO {
    const targetData = entity.getFields()
    return new QuarterlyTargetDTO(targetData);
  }
}