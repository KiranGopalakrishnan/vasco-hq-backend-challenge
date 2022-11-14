import {EntityToDTOTransformer} from "../../common/EntityToDTOTransformer";
import {SalesTeamQuarterlyTargetEntity} from "../../domain/entities/SalesTeamQuarterlyTargetEntity";
import {SalesTeamQuarterlyTargetDTO} from "./SalesTeamQuarterlyTargetDTO";


export class SalesTeamPerQuarterDTOTransformer implements EntityToDTOTransformer<SalesTeamQuarterlyTargetEntity, SalesTeamQuarterlyTargetDTO> {
  toDTO(entity: SalesTeamQuarterlyTargetEntity): SalesTeamQuarterlyTargetDTO {
    const targetData = entity.getFields()
    return new SalesTeamQuarterlyTargetDTO(targetData);
  }
}