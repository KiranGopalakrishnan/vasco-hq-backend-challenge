import {EntityToDTOTransformer} from "../../../common/EntityToDTOTransformer";
import {TeamMonthlyTarget} from "../../../domain/models/team-entities/TeamMonthlyTarget";
import {TeamTargetPerMonthDTO} from "./TeamTargetPerMonthDTO";


export class TeamTargetPerMonthDTOTransformer implements EntityToDTOTransformer<TeamMonthlyTarget, TeamTargetPerMonthDTO> {
  toDTO(entity: TeamMonthlyTarget): TeamTargetPerMonthDTO {
    const targetData = entity.getFields()
    return new TeamTargetPerMonthDTO(targetData);
  }
}