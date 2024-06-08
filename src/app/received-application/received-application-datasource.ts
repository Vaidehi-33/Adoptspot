import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ReceivedApplicationService } from './received-application.service';

export interface ReceivedApplicationItem {
  Item: {
    firstName: string;
    email: string;
    mobileNumber: string;
    message: string;
    isMarked: boolean;
    requestId: string;
  };
}

const EXAMPLE_DATA: ReceivedApplicationItem[] = [];

export class ReceivedApplicationDataSource extends DataSource<ReceivedApplicationItem> {
  data: ReceivedApplicationItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;

  constructor(private receivedApplicationService: ReceivedApplicationService) {
    super();
  }

  connect(): Observable<ReceivedApplicationItem[]> {
    if (this.paginator) {
      return merge(observableOf(this.data), this.paginator.page).pipe(
        map(() => {
          const receivedArray =
            this.receivedApplicationService.getRecievedArray;
          const updatedData = receivedArray.map(
            (item: any) => item.Item
          ) as ReceivedApplicationItem[];

          return this.getPagedData(updatedData);
        })
      );
    } else {
      throw Error(
        'Please set the paginator on the data source before connecting.'
      );
    }
  }

  disconnect(): void {}

  private getPagedData(
    data: ReceivedApplicationItem[]
  ): ReceivedApplicationItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.slice(startIndex, startIndex + this.paginator.pageSize);
    } else {
      return data;
    }
  }
}
