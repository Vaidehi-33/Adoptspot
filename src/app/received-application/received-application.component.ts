import { Notification } from './../notification.service';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {ReceivedApplicationDataSource,ReceivedApplicationItem,} from './received-application-datasource';
import { ReceivedApplicationService } from './received-application.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-received-application',
  templateUrl: './received-application.component.html',
  styleUrls: ['./received-application.component.scss'],
})
export class ReceivedApplicationComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<ReceivedApplicationItem>;

  @Input() postId: string = '';
  loading: boolean = true;
  receivedApplicationItems: ReceivedApplicationItem[] = [];

  dataSource: ReceivedApplicationDataSource;
  displayedColumns = [
    'firstName',
    'email',
    'mobileNumber',
    'Messages',
    'bookmark'
  ];
  constructor(
    private receivedApplicationService: ReceivedApplicationService,
    private notificationService: NotificationService
  ) {
    this.dataSource = new ReceivedApplicationDataSource(
      this.receivedApplicationService
    );
  }

  ngOnInit() {
    // for (let row:) {
      
    // }
    this.loading = true;
    this.receivedApplicationService
      .getRecievdApplication(this.postId)
      .then((response) => {
        response.subscribe((data: any) => {
          this.receivedApplicationItems =
            data.data as ReceivedApplicationItem[];
          this.receivedApplicationService.setRecievedArray =
            this.receivedApplicationItems;
          this.dataSource.data = this.receivedApplicationItems;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
        });
        this.loading = false;
      });
    this.receivedApplicationService
      .updateReadApplications(this.postId)
      .then((res) => {
        res.subscribe((data: any) => {
          console.log(data);
          this.notificationService.setNotificationsDirectly(data.Notifications);
        });
      })
      .catch((err) => console.log(err));
  }

  toggleCell(item: any): void {
    if (item.originalContent) {
      item.email = item.originalContent;
      delete item.originalContent;
    } else {
      item.originalContent = item.email;
      item.email = this.truncateContent(item.email);
    }
  }

  toggleMessage(item: any): void{
    if (item.originalMessage) {
      item.message = item.originalMessage;
      delete item.originalMessage;
    } else {
      item.originalMessage = item.message;
      item.message = this.truncateMessage(item.message);
    }
  }

  truncateContent(content: string): string {
    const maxLength = 16;
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...';
    }
    return content;
  }

  truncateMessage(content: string): string {
    const maxLength = 12;
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...';
    }
    return content;
  }

  onMarkClickHandler(i: number) {
    this.loading = true;
    this.receivedApplicationService
      .updateMark(this.receivedApplicationItems[i].Item.requestId)
      .then((res) => {
        res.subscribe((data) => {
          this.receivedApplicationService
            .getRecievdApplication(this.postId)
            .then((response) => {
              response.subscribe((data: any) => {
                this.receivedApplicationItems =
                  data.data as ReceivedApplicationItem[];
                this.receivedApplicationService.setRecievedArray =
                  this.receivedApplicationItems;
                this.dataSource.data = this.receivedApplicationItems;
                this.dataSource.paginator = this.paginator;
                this.table.dataSource = this.dataSource;
              });
              this.loading = false;
            });
        });
      })
      .catch((err) => {
        console.log(err);
        this.loading = false;
      });
  }
}
