import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, OnDestroy, OnInit, QueryList, Renderer2, Type, ViewContainerRef, ViewRef } from '@angular/core';
export declare class NgxSmartModalComponent implements OnInit, OnDestroy, AfterViewInit {
    private _renderer;
    private _changeDetectorRef;
    private componentFactoryResolver;
    private _document;
    private _platformId;
    closable: boolean;
    escapable: boolean;
    dismissable: boolean;
    identifier: string;
    customClass: string;
    visible: boolean;
    backdrop: boolean;
    force: boolean;
    hideDelay: number;
    autostart: boolean;
    target: string;
    ariaLabel: string | null;
    ariaLabelledBy: string | null;
    ariaDescribedBy: string | null;
    content: Type<any> | Text | ViewRef;
    visibleChange: EventEmitter<boolean>;
    onClose: EventEmitter<any>;
    onCloseFinished: EventEmitter<any>;
    onDismiss: EventEmitter<any>;
    onDismissFinished: EventEmitter<any>;
    onAnyCloseEvent: EventEmitter<any>;
    onAnyCloseEventFinished: EventEmitter<any>;
    onOpen: EventEmitter<any>;
    onOpenFinished: EventEmitter<any>;
    onEscape: EventEmitter<any>;
    onDataAdded: EventEmitter<any>;
    onDataRemoved: EventEmitter<any>;
    contentComponent: Type<Component>;
    layerPosition: number;
    overlayVisible: boolean;
    openedClass: boolean;
    createFrom: string;
    nsmDialog: QueryList<ElementRef>;
    dynamicContentContainer: QueryList<ViewContainerRef>;
    private _data;
    private nsmContent;
    private nsmOverlay;
    constructor(_renderer: Renderer2, _changeDetectorRef: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver, _document: any, _platformId: any);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Open the modal instance
     *
     * @param top open the modal top of all other
     * @returns the modal component
     */
    open(top?: boolean): NgxSmartModalComponent;
    /**
     * Close the modal instance
     *
     * @returns the modal component
     */
    close(): NgxSmartModalComponent;
    /**
     * Dismiss the modal instance
     *
     * @param e the event sent by the browser
     * @returns the modal component
     */
    dismiss(e: any): NgxSmartModalComponent;
    /**
     * Toggle visibility of the modal instance
     *
     * @param top open the modal top of all other
     * @returns the modal component
     */
    toggle(top?: boolean): NgxSmartModalComponent;
    /**
     * Add a custom class to the modal instance
     *
     * @param className the class to add
     * @returns the modal component
     */
    addCustomClass(className: string): NgxSmartModalComponent;
    /**
     * Remove a custom class to the modal instance
     *
     * @param className the class to remove
     * @returns the modal component
     */
    removeCustomClass(className?: string): NgxSmartModalComponent;
    /**
     * Returns the visibility state of the modal instance
     */
    isVisible(): boolean;
    /**
     * Checks if data is attached to the modal instance
     */
    hasData(): boolean;
    /**
     * Attach data to the modal instance
     *
     * @param data the data to attach
     * @param force override potentially attached data
     * @returns the modal component
     */
    setData(data: any, force?: boolean): NgxSmartModalComponent;
    /**
     * Retrieve the data attached to the modal instance
     */
    getData(): any;
    /**
     * Remove the data attached to the modal instance
     *
     * @returns the modal component
     */
    removeData(): NgxSmartModalComponent;
    /**
     * Add body class modal opened
     *
     * @returns the modal component
     */
    addBodyClass(): NgxSmartModalComponent;
    /**
     * Add body class modal opened
     *
     * @returns the modal component
     */
    removeBodyClass(): NgxSmartModalComponent;
    markForCheck(): void;
    /**
     * Listens for window resize event and recalculates modal instance position if it is element-relative
     */
    targetPlacement(): boolean | void;
    private _sendEvent(name, extraData?);
    /**
     * Is current platform browser
     */
    private readonly isBrowser;
    /**
     * Creates content inside provided ViewContainerRef
     */
    private createDynamicContent(changes, factory);
}
