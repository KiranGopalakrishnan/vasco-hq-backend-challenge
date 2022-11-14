import {EntityToDTOTransformer} from "../../../common/EntityToDTOTransformer";
import {TeamMonthlyTargetAggregate} from "../../../domain/entities/team-entities/TeamMonthlyTargetAggregate";
import {TeamTargetPerMonthDTO} from "./TeamTargetPerMonthDTO";


export class TeamTargetPerMonthDTOTransformer implements EntityToDTOTransformer<TeamMonthlyTargetAggregate, TeamTargetPerMonthDTO> {
  toDTO(entity: TeamMonthlyTargetAggregate): TeamTargetPerMonthDTO {
    const targetData = entity.getFields()
    return new TeamTargetPerMonthDTO(targetData);
  }
}