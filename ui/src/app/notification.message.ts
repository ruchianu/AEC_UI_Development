export class NotificationMessage {
    message: string='';
    type:any = NotificationType;
}

export enum NotificationType {
    success = 0,
    warning = 1,
    error = 2,
    info = 3
}