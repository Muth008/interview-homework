import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
            RouterTestingModule,
            NgbCollapseModule,
            HeaderComponent
        ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle navbar collapse state', () => {
        expect(component.isNavbarCollapsed).toBeTrue();
        const button = fixture.debugElement.query(By.css('.navbar-toggler')).nativeElement;
        button.click();
        expect(component.isNavbarCollapsed).toBeFalse();
    });

    it('should display brand name', () => {
        const brand = fixture.debugElement.query(By.css('.navbar-brand')).nativeElement;
        expect(brand.textContent).toContain('Warehouse');
    });

    it('should have correct router links for Products and Shipments', () => {
        const links = fixture.debugElement.queryAll(By.css('.nav-link'));
        expect(links.length).toEqual(2);
        expect(links[0].nativeElement.getAttribute('routerLink')).toBe('/products');
        expect(links[1].nativeElement.getAttribute('routerLink')).toBe('/shipments');
    });
}); 