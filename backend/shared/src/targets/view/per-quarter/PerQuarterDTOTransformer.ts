import {EntityToDTOTransformer} from "../../common/EntityToDTOTransformer";
import {QuarterlyTarget} from "../../domain/models/QuarterlyTarget";
import {PerQuarterDTO} from "./PerQuarterDTO";


export class PerQuarterDTOTransformer implements EntityToDTOTransformer<QuarterlyTarget, PerQuarterDTO> {
  toDTO(entity: QuarterlyTarget): PerQuarterDTO {
    const targetData = entity.getFields()
    return new PerQuarterDTO(targetData);
  }
}