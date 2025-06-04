import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Tags,
  SuccessResponse,
  Response
} from "tsoa";
import {
  createDegree,
  findAllDegrees,
  findDegreeById,
  modifyDegree,
  removeDegree
} from "../services/degreeService";
import { Degree } from "../interfaces/degree";

@Route("degrees")
@Tags("Degrees")
export class DegreeController extends Controller {

  @Get("/")
  public async getDegrees(): Promise<Degree[]> {
    return await findAllDegrees();
  }

  @Get("{id}")
  @Response(404, "Degree not found")
  public async getDegree(@Path() id: string): Promise<Degree> {
    const degree = await findDegreeById(id);
    if (!degree) {
      this.setStatus(404);
      throw new Error("Degree not found");
    }
    return degree;
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  public async createDegree(@Body() body: Degree): Promise<Degree> {
    const created = await createDegree(body);
    this.setStatus(201);
    return created;
  }

  @Put("{id}")
  @Response(404, "Degree not found")
  public async updateDegree(@Path() id: string, @Body() body: Degree): Promise<Degree> {
    const updated = await modifyDegree(id, body);
    if (!updated) {
      this.setStatus(404);
      throw new Error("Degree not found");
    }
    return updated;
  }

  @Delete("{id}")
  @Response(404, "Degree not found")
  public async deleteDegree(@Path() id: string): Promise<{ message: string }> {
    const deleted = await removeDegree(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error("Degree not found");
    }
    return { message: "Degree deleted successfully" };
  }
}
