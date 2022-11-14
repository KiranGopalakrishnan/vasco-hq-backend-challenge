import {EntityToDTOTransformer} from "../../common/EntityToDTOTransformer";
import {SalesTeamMonthlyTargetEntity} from "../../domain/entities/SalesTeamMonthlyTargetEntity";
import {SalesTeamMonthlyTargetDTO} from "./SalesTeamMonthlyTargetDTO";


export class SalesTeamPerMonthDTOTransformer implements EntityToDTOTransformer<SalesTeamMonthlyTargetEntity, SalesTeamMonthlyTargetDTO> {
  toDTO(entity: SalesTeamMonthlyTargetEntity): SalesTeamMonthlyTargetDTO {
    const targetData = entity.getFields()
    return new SalesTeamMonthlyTargetDTO(targetData);
  }
}