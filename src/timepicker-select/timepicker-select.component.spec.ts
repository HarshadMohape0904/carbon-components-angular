import { TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { Component } from "@angular/core";
import { ChevronDown16Module } from "@carbon/icons-angular/lib/chevron--down/16";
import { WarningFilled16Module } from "@carbon/icons-angular/lib/warning--filled/16";
import { TimePickerSelect } from "./timepicker-select.component";

@Component({
	template: `
	<ibm-timepicker-select (valueChange)="onChange(event)">
		<option class="test" selected value="AM">AM</option>
		<option class="test2" value="PM">PM</option>
	</ibm-timepicker-select>
	`
})
class TimePickerSelectTest {
	onChange(event) {}
}

describe("TimePickerSelect", () => {
	let fixture, wrapper, element, component;
	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TimePickerSelect,
				TimePickerSelectTest
			],
			imports: [
				FormsModule,
				ChevronDown16Module,
				WarningFilled16Module
			]
		});
	});

	it("should work", () => {
		fixture = TestBed.createComponent(TimePickerSelect);
		expect(fixture.componentInstance instanceof TimePickerSelect).toBe(true);
	});

	it("should call onChange on change select", () => {
		fixture = TestBed.createComponent(TimePickerSelectTest);
		wrapper = fixture.componentInstance;
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css(".bx--select-input"));
		spyOn(wrapper, "onChange");
		element.triggerEventHandler("change", {target: {value : ""}});
		fixture.detectChanges();
		expect(wrapper.onChange).toHaveBeenCalled();
	});

	it("should set options to AM and PM", () => {
		fixture = TestBed.createComponent(TimePickerSelectTest);
		fixture.detectChanges();
		expect(fixture.debugElement.query(By.css("ibm-timepicker-select")).query(By.css(".test")).nativeElement.innerHTML).toContain("AM");
		expect(fixture.debugElement.query(By.css("ibm-timepicker-select")).query(By.css(".test2")).nativeElement.innerHTML).toContain("PM");
	});

	it("should set label to test-label", () => {
		fixture = TestBed.overrideComponent(TimePickerSelectTest, {
			set: {
				template: `<ibm-timepicker-select label="test-label"></ibm-timepicker-select>`
			}
		}).createComponent(TimePickerSelectTest);
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css("ibm-timepicker-select")).nativeElement;
		expect(element.querySelector(".bx--label").textContent).toEqual("test-label");
	});

	it("should set disabled on the underlying select to true", () => {
		fixture = TestBed.overrideComponent(TimePickerSelectTest, {
			set: {
				template: `<ibm-timepicker-select [disabled]="true"></ibm-timepicker-select>`
			}
		}).createComponent(TimePickerSelectTest);
		fixture.detectChanges();
		element = fixture.debugElement.query(By.css(".bx--select-input")).nativeElement;
		expect(element.disabled).toEqual(true);
	});
});
