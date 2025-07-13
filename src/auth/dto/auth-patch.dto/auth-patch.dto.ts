import { PartialType } from "@nestjs/mapped-types";
import { AuthDto } from "../auth.dto/auth.dto";

export class AuthPatchDto extends PartialType(AuthDto) {
}