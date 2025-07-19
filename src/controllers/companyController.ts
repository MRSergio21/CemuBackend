import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Tags,
  Body,
  Path,
  SuccessResponse,
  Response,
} from "tsoa";

import {
  createCompany,
  findAllCompanies,
  findCompanyById,
  modifyCompany,
  removeCompany,
} from "../services/companyService";

import { Company } from "../interfaces/company";

@Route("companies")
@Tags("Company")
export class CompanyController extends Controller {
  @Get("/")
  public async getCompanies(): Promise<Company[]> {
    const companies = await findAllCompanies();
    return companies;
  }

  @Get("{id}")
  @Response<null>(404, "Company not found")
  public async getCompany(@Path() id: string): Promise<Company> {
    const company = await findCompanyById(id);
    if (!company) {
      this.setStatus(404);
      throw new Error("Company not found");
    }
    return {
      ...company,
      id: company.id,
    };
  }

  @SuccessResponse("201", "Created")
  @Post("/")
  public async postCompany(@Body() body: Company): Promise<Company> {
    const created = await createCompany(body);
    this.setStatus(201);
    return {
      ...created,
      id: created.id,
    };
  }

  @Put("{id}")
  @Response<null>(404, "Company not found")
  public async updateCompany(@Path() id: string, @Body() body: Company): Promise<Company> {
    const updated = await modifyCompany(id, body);
    if (!updated) {
      this.setStatus(404);
      return updated;
    }
    return {
      ...updated,
      id: updated.id,
    };
  }

  @Delete("{id}")
  @Response<null>(404, "Company not found")
  public async deleteCompany(@Path() id: string): Promise<{ message: string }> {
    const deleted = await removeCompany(id);
    if (!deleted) this.setStatus(404);
    return { message: "Company deleted successfully" };
  }
}
