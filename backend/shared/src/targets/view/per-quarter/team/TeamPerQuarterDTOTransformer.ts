import {EntityToDTOTransformer} from "../../../common/EntityToDTOTransformer";
import {TeamQuarterlyTargetAggregate} from "../../../domain/entities/team-entities/TeamQuarterlyTargetAggregate";
import {TeamQuarterlyTargetDTO} from "./TeamQuarterlyTargetDTO";


export class TeamPerQuarterDTOTransformer implements EntityToDTOTransformer<TeamQuarterlyTargetAggregate, TeamQuarterlyTargetDTO> {
  toDTO(entity: TeamQuarterlyTargetAggregate): TeamQuarterlyTargetDTO {
    const targetData = entity.getFields()
    return new TeamQuarterlyTargetDTO(targetData);
  }
}