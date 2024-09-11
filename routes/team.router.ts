import { Router } from "express";
import { handleGetAllTeamMember } from "../controller/team.controller";

const teamRouter = Router();

teamRouter.get("/findAll-teamMembers", handleGetAllTeamMember);

export default teamRouter;
