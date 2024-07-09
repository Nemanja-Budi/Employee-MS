import { User } from "../account/models/user.model";

export interface AuditLog {
    auditLogId: string; // Guid is represented as string in TypeScript
    tableName: string;
    operationType: string;
    oldData: string;
    newData: string;
    user?: User; // optional property
    userId?: string; // optional property
    changeDateTime: Date;
}