import {EntityToDTOTransformer} from "../../common/EntityToDTOTransformer";
import {MonthlyTarget} from "../../domain/models/MonthlyTarget";
import {PerMonthDTO} from "./PerMonthDTO";


export class PerMonthDTOTransformer implements EntityToDTOTransformer<MonthlyTarget, PerMonthDTO> {
  toDTO(entity: MonthlyTarget): PerMonthDTO {
    const targetData = entity.getFields()
    return new PerMonthDTO(targetData);
  }
}