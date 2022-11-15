import {EntityToDTOTransformer} from "../../../common/EntityToDTOTransformer";
import {TeamQuarterlyTarget} from "../../../domain/models/team-entities/TeamQuarterlyTarget";
import {TeamQuarterlyTargetDTO} from "./TeamQuarterlyTargetDTO";


export class TeamPerQuarterDTOTransformer implements EntityToDTOTransformer<TeamQuarterlyTarget, TeamQuarterlyTargetDTO> {
  toDTO(entity: TeamQuarterlyTarget): TeamQuarterlyTargetDTO {
    const targetData = entity.getFields()
    return new TeamQuarterlyTargetDTO(targetData);
  }
}