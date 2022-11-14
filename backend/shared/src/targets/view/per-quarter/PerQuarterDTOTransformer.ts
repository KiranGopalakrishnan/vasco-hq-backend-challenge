import {EntityToDTOTransformer} from "../../common/EntityToDTOTransformer";
import {QuarterlyTargetAggregate} from "../../domain/entities/QuarterlyTargetAggregate";
import {PerQuarterDTO} from "./PerQuarterDTO";


export class PerQuarterDTOTransformer implements EntityToDTOTransformer<QuarterlyTargetAggregate, PerQuarterDTO> {
  toDTO(entity: QuarterlyTargetAggregate): PerQuarterDTO {
    const targetData = entity.getFields()
    return new PerQuarterDTO(targetData);
  }
}