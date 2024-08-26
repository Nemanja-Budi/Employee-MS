import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Member } from '../../models/member.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-user-table',
  templateUrl: './admin-user-table.component.html',
  styleUrls: ['./admin-user-table.component.css']
})
export class AdminUserTableComponent {

  adminService: AdminService = inject(AdminService);

  membersLength!: number;
  memberToDelete: Member | undefined;
  modalDialog: HTMLDialogElement | undefined;
  actionDialog: HTMLDialogElement | undefined;
  currentMember!: Member;

  members: Observable<Member[]> = this.adminService.getMembers().pipe(map((members) => {
    this.membersLength = members.members.length
    return members.members;
  }));

  onDeleteUser(editUser: HTMLDialogElement, member_id: string): void {
    editUser.showModal();
    this.actionDialog?.close();
    this.findMember(member_id).subscribe({
      next: (member) => {
        if(!member) return;
        this.memberToDelete = member;
        this.modalDialog = editUser;
      }
    });
  }

  onConfirm(): void {
    if(this.memberToDelete) {
      this.adminService.deleteMember(this.memberToDelete.id).subscribe({
        next: () => {
          this.members = this.adminService.getMembers().pipe(map((members) => members.members));
          this.modalDialog?.close();
          this.actionDialog?.close();
        }
      });
    }
  }

  openDetailModal(modal: HTMLDialogElement, member: Member): void {
    this.currentMember = member;
    this.actionDialog = modal;
    modal.showModal();
  }

  closeModal(modal: HTMLDialogElement): void {
    modal.close()
  }

  onCloseModal(): void {
    this.actionDialog?.showModal();
    this.modalDialog?.close();
  }

  onLockMember(modal: HTMLDialogElement,member_id: string): void {
    this.adminService.lockMember(member_id).subscribe({
      next: () => {
        this.members = this.adminService.getMembers().pipe(map((members) => members.members))
        modal.close();
      }
    });
  }

  onUnlockMember(modal: HTMLDialogElement, member_id: string): void {
    this.adminService.unlockMember(member_id).subscribe({
      next: () => {
        this.members = this.adminService.getMembers().pipe(map((members) => members.members))
        modal.close();
      }
    });
  }

  private findMember(id: string): Observable<Member | undefined> {
    return this.members.pipe(
      map((members: Member[]) => {
        const foundMember = members.find((member) => member.id === id);
        return foundMember ? foundMember : undefined;
      })
    );
  }
}
