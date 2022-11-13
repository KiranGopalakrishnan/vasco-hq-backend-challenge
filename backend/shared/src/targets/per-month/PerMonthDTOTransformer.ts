import {EntityToDTOTransformer} from "../common/EntityToDTOTransformer";
import {MonthlyTargetEntity} from "../domain/entities/MonthlyTargetEntity";
import {MonthlyTargetDTO} from "./MonthlyTargetDTO";


export class PerMonthDTOTransformer implements EntityToDTOTransformer<MonthlyTargetEntity, MonthlyTargetDTO> {
  toDTO(entity: MonthlyTargetEntity): MonthlyTargetDTO {
    const targetData = entity.getFields()
    return new MonthlyTargetDTO(targetData);
  }
}