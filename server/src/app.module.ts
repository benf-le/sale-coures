import {Module} from '@nestjs/common';

import {AuthModule} from "./auth/auth.module";
import {PrismaModule} from './prisma/prisma.module';
import {ConfigModule} from "@nestjs/config";

import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {UserInterceptors} from "./auth/interceptors/user.interceptors";
import {AuthorizationGuard} from "./auth/guard/authorization.guard";
import {UserModule} from "./user/user.module";
import {CoursesModule} from "./courses/courses.module";
import {ChaptersModule} from "./chapters/chapters.module";
import {AttachmentsModule} from "./attachments/chapters.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }), //đọc dữ liệu từ file env, bảo mật database, không đẩy file env lên github
        AuthModule,
        UserModule,
        ChaptersModule,
        PrismaModule,
        CoursesModule,
        AttachmentsModule
    ],
    providers:[{
        provide: APP_INTERCEPTOR,
        useClass: UserInterceptors,
    },
        {
            provide: APP_GUARD,
            useClass: AuthorizationGuard
        }]

})
export class AppModule {
}
