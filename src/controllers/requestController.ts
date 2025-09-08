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

import { createRequest, findAllRequests, findRequestById, modifyRequest } from "../services/requestService";

import { Request, RequestInput } from "../interfaces/request";

@Route("requests")
@Tags("Requests")
export class RequestController extends Controller {
    @Get("/{id}")
    @Response(400, "Invalid ID")
    @Response(404, "Request not found")
    @Response(500, "Internal Server Error")
    public async getRequest(@Path() id: string): Promise<Request> {
        if (!id || isNaN(Number(id))) {
            this.setStatus(400);
            throw new Error("Invalid ID");
        }
        const request = await findRequestById(id);
        if (!request) {
            this.setStatus(404);
            throw new Error("Request not found");
        }
        return {
            ...request,
            internship_id: request.internship
        };
    }

    @Get()
    @Response(500, "Internal Server Error")
    public async getRequests(): Promise<Request[]> {
        const requests = await findAllRequests();
        return requests.map((req: any) => ({
            ...req,
            internship_id: req.internship
        }));
    }
    @Post()
    @SuccessResponse("201", "Created")
    @Response(400, "Invalid data")
    @Response(500, "Internal Server Error")
    public async postRequest(@Body() request: RequestInput): Promise<Request> {
        const newRequest = await createRequest(request);
        this.setStatus(201);
        return {
            ...newRequest,
            internship_id: newRequest.internship
        };
    }
    @Put("/{id}")
    @Response(400, "Invalid ID")
    @Response(404, "Request not found")
    @Response(500, "Internal Server Error")
    public async putRequest(@Path() id: string, @Body() request: RequestInput): Promise<Request> {
        if (!id || isNaN(Number(id))) {
            this.setStatus(400);
            throw new Error("Invalid ID");
        }
        const existingRequest = await findRequestById(id);
        if (!existingRequest) {
            this.setStatus(404);
            throw new Error("Request not found");
        }
        const updatedRequest = await modifyRequest(id, request);
        return {
            ...updatedRequest,
            internship_id: updatedRequest.internship
        };
    }
}