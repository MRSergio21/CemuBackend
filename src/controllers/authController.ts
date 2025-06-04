import {
  Body,
  Controller,
  Post,
  Route,
  Tags,
  SuccessResponse,
  Response
} from "tsoa";
import { loginUser, registerUser } from "../services/authService";
import { AuthInput, AuthResponse, RegisterInput } from "../interfaces/auth";

@Route("auth")
@Tags("Auth")
export class AuthController extends Controller {
  @Post("/login")
  @Response(400, "Invalid credentials")
  public async login(@Body() body: AuthInput): Promise<AuthResponse> {
    return await loginUser(body);
  }

  @Post("/register")
  @SuccessResponse("201", "User registered")
  @Response(400, "Invalid registration data")
  public async register(@Body() body: RegisterInput): Promise<AuthResponse> {
    const result = await registerUser(body);
    this.setStatus(201);
    return result;
  }
}
