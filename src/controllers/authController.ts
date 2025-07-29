import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from "tsoa";
import { loginUser, registerUser } from "../services/authService";
import { findUserById } from "../models/userModel";
import { AuthInput, AuthResponse, RegisterInput, SafeUser } from "../interfaces/auth";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  @Post("/login")
  @Response(400, "Invalid credentials")
  public async login(@Body() body: AuthInput): Promise<AuthResponse> {
    try {
      return await loginUser(body);
    } catch (error) {
      this.setStatus(400);
      throw new Error((error as Error).message);
    }
  }

  @Post("/register")
  @SuccessResponse("201", "User registered")
  @Response(400, "Invalid registration data")
  public async register(@Body() body: RegisterInput): Promise<AuthResponse> {
    try {
      const result = await registerUser(body);
      this.setStatus(201);
      return result;
    } catch (error) {
      this.setStatus(400);
      throw new Error((error as Error).message);
    }
  }

  @Get("/me")
  @Security("jwt")
  @Response(401, "Unauthorized")
  @Response(404, "User not found")
  public async me(@Request() req: any): Promise<SafeUser> {
    const userPayload = req.user;

    if (!userPayload) {
      this.setStatus(401);
      throw new Error("Unauthorized");
    }

    const user = await findUserById(userPayload.id);

    if (!user) {
      this.setStatus(404);
      throw new Error("User not found");
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
    };
  }
}
