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
  Response,
} from "tsoa";

import {
  createInternship,
  findAllInternships,
  findInternshipById,
  modifyInternship,
  removeInternship,
} from "../services/internshipService";

import { Internship, InternshipInput } from "../interfaces/internships";

@Route("internships")
@Tags("Internships")
export class InternshipController extends Controller {
  @Get("/{id}")
  @Response(400, "Invalid ID")
  @Response(404, "Internship not found")
  @Response(500, "Internal Server Error")
  public async getInternship(@Path() id: string): Promise<Internship> {
    if (!id || isNaN(Number(id))) {
      this.setStatus(400);
      throw new Error("Invalid ID");
    }

    const internship = await findInternshipById(id);
    if (!internship) {
      this.setStatus(404);
      throw new Error("Internship not found");
    }

    return internship;
  }

  @Get()
  @Response(500, "Internal Server Error")
  public async getInternships(): Promise<Internship[]> {
    return await findAllInternships();
  }

  @Post()
  @SuccessResponse("201", "Created")
  @Response(400, "Invalid data")
  @Response(500, "Internal Server Error")
  public async postInternship(@Body() internship: InternshipInput): Promise<Internship> {
    const newInternship = await createInternship(internship);
    this.setStatus(201);
    return newInternship;
  }

  @Put("/{id}")
  @Response(400, "Invalid ID")
  @Response(404, "Internship not found")
  @Response(500, "Internal Server Error")
  public async updateInternship(
    @Path() id: string,
    @Body() internship: InternshipInput
  ): Promise<Internship> {
    if (!id || isNaN(Number(id))) {
      this.setStatus(400);
      throw new Error("Invalid ID");
    }

    const updatedInternship = await modifyInternship(id, internship);
    if (!updatedInternship) {
      this.setStatus(404);
      throw new Error("Internship not found");
    }

    return updatedInternship;
  }

  @Delete("/{id}")
  @Response(400, "Invalid ID")
  @Response(404, "Internship not found")
  @Response(500, "Internal Server Error")
  public async deleteInternship(@Path() id: string): Promise<{ message: string }> {
    if (!id || isNaN(Number(id))) {
      this.setStatus(400);
      throw new Error("Invalid ID");
    }

    const deleted = await removeInternship(id);
    if (!deleted) {
      this.setStatus(404);
      throw new Error("Internship not found");
    }

    return { message: "Internship deleted successfully" };
  }
}
