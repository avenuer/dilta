import { DebugElement } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
  async
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DyanmicDatagridModule } from './dynamic-datagrid.module';
import {
  DynamicDataGridComponent,
  KeysConfig,
  MathExp,
  ChangeEvnt,
  Map
} from './dynamic-datagrid.component';
import { Score } from '../../../../screwbox/src/gen.faker';

// WARNING: DONT RUN THIS TEST WITH JEST RUN WITH CHROME
// AND KARAMA.

jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;

function scoreGen() {
  return {
    class: 'pry4',
    subject: 'english',
    b_id: '5c45f4f9-9d3b-45a5-a01b-709151411a18',
    name: 'Golden Rempel',
    fa: 25,
    sa: 0,
    exam: 54,
    id: 'e6d9e908-7eac-41d6-9174-f15009bb5ba2',
    session: '2015/2016',
    term: 'second term'
  };
}

function examList(params: any) {
  return [
    {
      class: 'pry3',
      subject: 'physics',
      b_id: '7ca024f8-0042-4fbe-a0bd-59e7cf6e10ef',
      name: 'Ena Ankunding',
      fa: 21,
      sa: 12,
      exam: 26,
      id: 'c609c649-6e32-4615-8766-31e914779c6d',
      session: '2015/2016',
      term: 'third term'
    },
    {
      class: 'pry2',
      subject: 'economics',
      b_id: '747a6f5e-ac12-4fa5-92ef-fd0fc3228d69',
      name: 'Jamal Gislason',
      fa: 18,
      sa: 27,
      exam: 7,
      id: '50d8f19a-f2e9-4c0d-af0c-539f14b86d9e',
      session: '2016/2017',
      term: 'third term'
    },
    {
      class: 'pry6',
      subject: 'government',
      b_id: 'e4864d8a-69ae-4333-9d45-161cb20aa3c5',
      name: 'Wilfredo Cruickshank',
      fa: 1,
      sa: 2,
      exam: 41,
      id: 'a9484611-9ca4-4934-85eb-c79ab2e6bbf9',
      session: '2018/2019',
      term: 'second term'
    },
    {
      class: 'nus1',
      subject: 'physics',
      b_id: '5ad0a238-03f5-42a4-bea6-aa6cf3928fd0',
      name: 'Emil Morar',
      fa: 21,
      sa: 25,
      exam: 29,
      id: '9f4812ef-6f26-483d-bdf5-efc8d5617a97',
      session: '2018/2019',
      term: 'first term'
    },
    {
      class: 'pry3',
      subject: 'english',
      b_id: 'cac75331-4c11-4939-b675-fe2f57ad8bab',
      name: 'Loren Legros',
      fa: 8,
      sa: 23,
      exam: 15,
      id: '24e4b0c8-973a-4ae8-962b-f1979d9826c4',
      session: '2016/2017',
      term: 'second term'
    }
  ];
}

const keyList: KeysConfig[] = [
  { key: 'name', editable: false, type: 'string', send: true },
  {
    key: 'fa',
    editable: true,
    type: 'number',
    send: false,
    config: { max: 30, min: 0 }
  },
  {
    key: 'sa',
    editable: true,
    type: 'number',
    send: false,
    config: { max: 30, min: 0 }
  },
  {
    key: 'exam',
    editable: true,
    type: 'number',
    send: false,
    config: { max: 70, min: 0 }
  },
  { key: 'total', editable: true, type: 'number', send: false }
];

const tracker = 'id';
const scoreList = examList(10);
const e = scoreList[0];

xdescribe(`DynamicDataGridComponent: Unit Test`, () => {
  let fixture: ComponentFixture<DynamicDataGridComponent>;
  let editor: DynamicDataGridComponent;
  let elem;
  // let cellElem;
  let elems: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [DyanmicDatagridModule]
      });

      fixture = TestBed.createComponent(DynamicDataGridComponent);
      editor = fixture.componentInstance;
      elems = fixture.debugElement;
    })
  );

  it(`should throw error for empty keyslist`, () => {
    expect(() => fixture.detectChanges()).toThrowError(
      DynamicDataGridComponent.EmptyKeysError.message
    );
  });

  it(`should throw error for empty tracter field`, () => {
    editor.keys = keyList;
    expect(() => fixture.detectChanges()).toThrowError(
      DynamicDataGridComponent.TrackerKeyError.message
    );
  });

  it(
    `should send the data if marked send`,
    fakeAsync(() => {
      const sendSpy = spyOn(editor.sender, 'emit').and.callFake(() => {});
      const map: Map = { x: 0, y: 1 };
      const data: Score = scoreGen();
      editor.keys = keyList;
      editor.tracker = tracker;
      fixture.detectChanges();
      editor.activate(map, data, 'name');
      fixture.detectChanges();
      expect(sendSpy).toHaveBeenCalled();
    })
  );

  it(`should activate input key if editable`, () => {
    const activatedInp = spyOn(editor, 'activateInput').and.callFake(() => {});
    const map: Map = { x: 1, y: 1 };
    const data: Score = scoreGen();
    editor.keys = keyList;
    editor.tracker = tracker;
    fixture.detectChanges();
    editor.activate(map, data, 'fa');
    expect(activatedInp).toHaveBeenCalled();
  });

  it(`should validate that the input is within acceptable range`, () => {
    const activatedInp = spyOn(editor, 'activateInput').and.callFake(() => {});
    const map: Map = { x: 1, y: 1 };
    const data: Score = scoreGen();
    editor.keys = keyList;
    editor.tracker = tracker;
    fixture.detectChanges();
    elem = document.createElement('input');
    elem.value = 20;
    editor.validateKeyInput(elem, map, 'fa');
    fixture.detectChanges();
  });

  it(`should throw error for  input not within acceptable range`, () => {
    const activatedInp = spyOn(editor, 'activateInput').and.callFake(() => {});
    const map: Map = { x: 1, y: 1 };
    const data: Score = scoreGen();
    editor.keys = keyList;
    editor.tracker = tracker;
    fixture.detectChanges();
    elem = document.createElement('input');
    elem.value = 50;
    expect(() => editor.validateKeyInput(elem, map, 'fa')).toThrowError(
      DynamicDataGridComponent.GridValueInputError.message
    );
  });

  it(`should evaluate math expressions for number type`, () => {
    const activatedInp = spyOn(editor, 'mathEval').and.returnValue(4);
    const map: Map = { x: 1, y: 1 };
    const data: Score = scoreGen();
    editor.keys = keyList;
    editor.tracker = tracker;
    fixture.detectChanges();
    elem = document.createElement('input');
    let _e = e;
    _e.fa = '2 + 2' as any;
    _e = editor.updateItem(map, { elem, e, key: 'fa' }, e);
    expect(_e.fa).toEqual(4);
  });

  it(`should throw error for empty input or invalid expression for number type`, () => {
    const errSpy = spyOn(editor, 'errorHandler');
    const map: Map = { x: 1, y: 1 };
    const data: Score = scoreGen();
    editor.keys = keyList;
    editor.tracker = tracker;
    fixture.detectChanges();
    editor.mathEval('', 4, map);
    expect(errSpy).toHaveBeenCalled();
  });

  it(`should evaluate valid input for number type`, () => {
    const map: Map = { x: 1, y: 1 };
    const data: Score = scoreGen();
    editor.keys = keyList;
    editor.tracker = tracker;
    fixture.detectChanges();
    const _value = editor.mathEval('2 + 5', 4, map);
    expect(parseInt(_value, 10)).toEqual(7);
  });

  it(`should evaluate expression based input for number type`, () => {
    const map: Map = { x: 1, y: 1 };
    const data: Score = scoreGen();
    editor.mathExp = `total = exam + fa + sa`;
    editor.keys = keyList;
    editor.tracker = tracker;
    fixture.detectChanges();
    const _value = editor.evalExpress(e, map);
    expect((_value as any).total).toBe(
      _value.fa + (_value as any).ca + _value.exam
    );
  });

  it(`should call error handler when evaluating invalid expression`, () => {
    const errSpy = spyOn(editor, 'errorHandler');
    const map: Map = { x: 1, y: 1 };
    const data: Score = scoreGen();
    editor.mathExp = `2/0`;
    editor.keys = keyList;
    editor.tracker = tracker;
    fixture.detectChanges();
    editor.evalExpress(e, map);
    expect(errSpy).toHaveBeenCalled();
  });
});
xdescribe(`DynamicDataGridComponent: Unit-Integration Test`, () => {
  let fixture: ComponentFixture<DynamicDataGridComponent>;
  let editor: DynamicDataGridComponent;
  let elem;
  let cellElem;
  let elems: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [DyanmicDatagridModule]
      });

      fixture = TestBed.createComponent(DynamicDataGridComponent);
      editor = fixture.componentInstance;
      elems = fixture.debugElement;
    })
  );

  it(`should throw error for empty keyslist`, () => {
    expect(() => fixture.detectChanges()).toThrowError(
      DynamicDataGridComponent.EmptyKeysError.message
    );
  });

  it(`should throw error for empty tracter field`, () => {
    editor.keys = keyList;
    expect(() => fixture.detectChanges()).toThrowError(
      DynamicDataGridComponent.TrackerKeyError.message
    );
  });

  it(
    `should show input element input when activated`,
    fakeAsync(() => {
      const map: Map = { x: 1, y: 0 };
      const _inpID = `${map.x.toString()}_${map.y.toString()}_${'fa'}`;
      const data: Score = scoreGen();
      editor.keys = keyList;
      editor.tracker = tracker;
      editor.datagrid = scoreList;
      fixture.detectChanges();
      //  getting and double clicking the cell grid
      cellElem = document.getElementById(`1fa`);
      elem = document.getElementById(_inpID) as HTMLInputElement;
      expect((elem as HTMLInputElement).hidden).toBe(true);
      (cellElem as HTMLElement).dispatchEvent(new Event('dblclick'));
      fixture.detectChanges();
      tick(500);
      //  checking if the input element is visible
      expect(elem.hidden).toBe(false);
    })
  );

  it(
    `should triger edited function and update cell block`,
    fakeAsync(() => {
      const spyEditor = spyOn(editor, 'edited').and.callThrough();
      const map: Map = { x: 1, y: 0 };
      const _inpID = `${map.x.toString()}_${map.y.toString()}_${'fa'}`;
      const data: Score = scoreGen();
      editor.keys = keyList;
      editor.tracker = tracker;
      editor.datagrid = scoreList;
      fixture.detectChanges();
      // double clicking the cell grid
      cellElem = document.getElementById(`1fa`);
      elem = document.getElementById(_inpID) as HTMLInputElement;
      (cellElem as HTMLElement).dispatchEvent(new Event('dblclick'));
      fixture.detectChanges();
      // setting the input value
      (elem as HTMLInputElement).value = '20';
      //  dispactching the change event
      (elem as HTMLInputElement).dispatchEvent(new Event('change'));
      fixture.detectChanges();
      tick(500);
      expect(spyEditor).toHaveBeenCalled();
      // dispatchong the enter event
      (elem as HTMLInputElement).dispatchEvent(new Event('enter'));
      expect(cellElem.innerText).toContain('20');
    })
  );

  it(
    `should display error in the cell block`,
    fakeAsync(() => {
      const spyEditor = spyOn(editor, 'edited').and.callThrough();
      const map: Map = { x: 1, y: 0 };
      const _inpID = `${map.x.toString()}_${map.y.toString()}_${'fa'}`;
      const data: Score = scoreGen();
      editor.keys = keyList;
      editor.tracker = tracker;
      editor.datagrid = scoreList;
      fixture.detectChanges();
      //  getting error span element
      const spanElem: HTMLSpanElement = document.getElementById(
        `${map.x.toString()}_${map.y.toString()}_${'err'}`
      );
      // getting cell grid element
      cellElem = document.getElementById(`1fa`);
      elem = document.getElementById(_inpID) as HTMLInputElement;
      // double clicking cell grid
      (cellElem as HTMLElement).dispatchEvent(new Event('dblclick'));
      expect(spanElem.hidden).toBe(true);
      fixture.detectChanges();
      // changing the input value to an invalid value
      (elem as HTMLInputElement).value = 'x';
      (elem as HTMLInputElement).dispatchEvent(new Event('change'));
      fixture.detectChanges();
      tick(500);
      expect(spyEditor).toHaveBeenCalled();
      (elem as HTMLInputElement).dispatchEvent(new Event('enter'));
      // checking if the error elem is visible to the user;
      expect(spanElem.hidden).toBe(false);
      tick(3000); // timeout is required for the 2500's in d main code
      fixture.detectChanges();
    })
  );
});

// <app-dynamic-table (sender)="logger($event)" (changedData)="logger($event)"
// [tracker] = "'id'"[keys] = "studentKeysConfig"[datagrid] = "display" > </app-dynamic-table>
