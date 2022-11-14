import {EntityToDTOTransformer} from "../../common/EntityToDTOTransformer";
import {MonthlyTargetEntity} from "../../domain/entities/MonthlyTargetEntity";
import {PerMonthDTO} from "./PerMonthDTO";


export class PerMonthDTOTransformer implements EntityToDTOTransformer<MonthlyTargetEntity, PerMonthDTO> {
  toDTO(entity: MonthlyTargetEntity): PerMonthDTO {
    const targetData = entity.getFields()
    return new PerMonthDTO(targetData);
  }
}