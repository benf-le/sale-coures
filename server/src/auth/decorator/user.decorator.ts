// Decorator để lấy thông tin user cho tuwfng request

import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export interface UserInfo {
    email: string;
    id: string;
    createdAt: number
    updatedAt: number
}
export const Users = createParamDecorator((data, context: ExecutionContext)=>{
    const request = context.switchToHttp().getRequest()
    return request.user
})

