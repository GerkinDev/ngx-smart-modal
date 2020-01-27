/**
 * @license ngx-smart-modal
 * MIT license
 */

import { ApplicationRef, ChangeDetectorRef, Component, ComponentFactoryResolver, EmbeddedViewRef, EventEmitter, HostListener, Inject, Injectable, Injector, Input, NgModule, Output, PLATFORM_ID, Renderer2, TemplateRef, Type, ViewChildren, ViewContainerRef } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSmartModalConfig = {
    bodyClassOpen: 'dialog-open',
    prefixEvent: 'ngx-smart-modal.'
};
/**
 * @record
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSmartModalComponent = (function () {
    function NgxSmartModalComponent(_renderer, _changeDetectorRef, componentFactoryResolver, _document, _platformId) {
        this._renderer = _renderer;
        this._changeDetectorRef = _changeDetectorRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this._document = _document;
        this._platformId = _platformId;
        this.closable = true;
        this.escapable = true;
        this.dismissable = true;
        this.identifier = '';
        this.customClass = 'nsm-dialog-animation-fade';
        this.visible = false;
        this.backdrop = true;
        this.force = true;
        this.hideDelay = 500;
        this.autostart = false;
        this.target = '';
        this.ariaLabel = null;
        this.ariaLabelledBy = null;
        this.ariaDescribedBy = null;
        this.visibleChange = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onCloseFinished = new EventEmitter();
        this.onDismiss = new EventEmitter();
        this.onDismissFinished = new EventEmitter();
        this.onAnyCloseEvent = new EventEmitter();
        this.onAnyCloseEventFinished = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onOpenFinished = new EventEmitter();
        this.onEscape = new EventEmitter();
        this.onDataAdded = new EventEmitter();
        this.onDataRemoved = new EventEmitter();
        this.layerPosition = 1041;
        this.overlayVisible = false;
        this.openedClass = false;
        this.createFrom = 'html';
    }
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.identifier || !this.identifier.length) {
            throw new Error('identifier field isn’t set. Please set one before calling <ngx-smart-modal> in a template.');
        }
        this._sendEvent('create');
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.contentComponent) {
            var /** @type {?} */ factory_1 = this.componentFactoryResolver.resolveComponentFactory(this.contentComponent);
            this.createDynamicContent(this.dynamicContentContainer, factory_1);
            this.dynamicContentContainer.changes.subscribe(function (contentViewContainers) {
                _this.createDynamicContent(contentViewContainers, factory_1);
            });
        }
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._sendEvent('delete');
    };
    /**
     * Open the modal instance
     *
     * @param {?=} top open the modal top of all other
     * @return {?} the modal component
     */
    NgxSmartModalComponent.prototype.open = /**
     * Open the modal instance
     *
     * @param {?=} top open the modal top of all other
     * @return {?} the modal component
     */
    function (top) {
        this._sendEvent('open', { top: top });
        return this;
    };
    /**
     * Close the modal instance
     *
     * @return {?} the modal component
     */
    NgxSmartModalComponent.prototype.close = /**
     * Close the modal instance
     *
     * @return {?} the modal component
     */
    function () {
        this._sendEvent('close');
        return this;
    };
    /**
     * Dismiss the modal instance
     *
     * @param {?} e the event sent by the browser
     * @return {?} the modal component
     */
    NgxSmartModalComponent.prototype.dismiss = /**
     * Dismiss the modal instance
     *
     * @param {?} e the event sent by the browser
     * @return {?} the modal component
     */
    function (e) {
        if (!this.dismissable || !e.target.classList.contains('overlay')) {
            return this;
        }
        this._sendEvent('dismiss');
        return this;
    };
    /**
     * Toggle visibility of the modal instance
     *
     * @param {?=} top open the modal top of all other
     * @return {?} the modal component
     */
    NgxSmartModalComponent.prototype.toggle = /**
     * Toggle visibility of the modal instance
     *
     * @param {?=} top open the modal top of all other
     * @return {?} the modal component
     */
    function (top) {
        this._sendEvent('toggle', { top: top });
        return this;
    };
    /**
     * Add a custom class to the modal instance
     *
     * @param {?} className the class to add
     * @return {?} the modal component
     */
    NgxSmartModalComponent.prototype.addCustomClass = /**
     * Add a custom class to the modal instance
     *
     * @param {?} className the class to add
     * @return {?} the modal component
     */
    function (className) {
        if (!this.customClass.length) {
            this.customClass = className;
        }
        else {
            this.customClass += ' ' + className;
        }
        return this;
    };
    /**
     * Remove a custom class to the modal instance
     *
     * @param {?=} className the class to remove
     * @return {?} the modal component
     */
    NgxSmartModalComponent.prototype.removeCustomClass = /**
     * Remove a custom class to the modal instance
     *
     * @param {?=} className the class to remove
     * @return {?} the modal component
     */
    function (className) {
        if (className) {
            this.customClass = this.customClass.replace(className, '').trim();
        }
        else {
            this.customClass = '';
        }
        return this;
    };
    /**
     * Returns the visibility state of the modal instance
     * @return {?}
     */
    NgxSmartModalComponent.prototype.isVisible = /**
     * Returns the visibility state of the modal instance
     * @return {?}
     */
    function () {
        return this.visible;
    };
    /**
     * Checks if data is attached to the modal instance
     * @return {?}
     */
    NgxSmartModalComponent.prototype.hasData = /**
     * Checks if data is attached to the modal instance
     * @return {?}
     */
    function () {
        return this._data !== undefined;
    };
    /**
     * Attach data to the modal instance
     *
     * @param {?} data the data to attach
     * @param {?=} force override potentially attached data
     * @return {?} the modal component
     */
    NgxSmartModalComponent.prototype.setData = /**
     * Attach data to the modal instance
     *
     * @param {?} data the data to attach
     * @param {?=} force override potentially attached data
     * @return {?} the modal component
     */
    function (data, force) {
        if (!this.hasData() || (this.hasData() && force)) {
            this._data = data;
            this.onDataAdded.emit(this._data);
            this.markForCheck();
        }
        return this;
    };
    /**
     * Retrieve the data attached to the modal instance
     * @return {?}
     */
    NgxSmartModalComponent.prototype.getData = /**
     * Retrieve the data attached to the modal instance
     * @return {?}
     */
    function () {
        return this._data;
    };
    /**
     * Remove the data attached to the modal instance
     *
     * @return {?} the modal component
     */
    NgxSmartModalComponent.prototype.removeData = /**
     * Remove the data attached to the modal instance
     *
     * @return {?} the modal component
     */
    function () {
        this._data = undefined;
        this.onDataRemoved.emit(true);
        this.markForCheck();
        return this;
    };
    /**
     * Add body class modal opened
     *
     * @return {?} the modal component
     */
    NgxSmartModalComponent.prototype.addBodyClass = /**
     * Add body class modal opened
     *
     * @return {?} the modal component
     */
    function () {
        this._renderer.addClass(this._document.body, NgxSmartModalConfig.bodyClassOpen);
        return this;
    };
    /**
     * Add body class modal opened
     *
     * @return {?} the modal component
     */
    NgxSmartModalComponent.prototype.removeBodyClass = /**
     * Add body class modal opened
     *
     * @return {?} the modal component
     */
    function () {
        this._renderer.removeClass(this._document.body, NgxSmartModalConfig.bodyClassOpen);
        return this;
    };
    /**
     * @return {?}
     */
    NgxSmartModalComponent.prototype.markForCheck = /**
     * @return {?}
     */
    function () {
        try {
            this._changeDetectorRef.detectChanges();
        }
        catch (/** @type {?} */ e) {
        }
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Listens for window resize event and recalculates modal instance position if it is element-relative
     * @return {?}
     */
    NgxSmartModalComponent.prototype.targetPlacement = /**
     * Listens for window resize event and recalculates modal instance position if it is element-relative
     * @return {?}
     */
    function () {
        if (!this.isBrowser || !this.nsmDialog.length || !this.nsmContent.length || !this.nsmOverlay.length || !this.target) {
            return false;
        }
        var /** @type {?} */ targetElement = this._document.querySelector(this.target);
        if (!targetElement) {
            return false;
        }
        var /** @type {?} */ targetElementRect = targetElement.getBoundingClientRect();
        var /** @type {?} */ bodyRect = this.nsmOverlay.first.nativeElement.getBoundingClientRect();
        var /** @type {?} */ nsmContentRect = this.nsmContent.first.nativeElement.getBoundingClientRect();
        var /** @type {?} */ nsmDialogRect = this.nsmDialog.first.nativeElement.getBoundingClientRect();
        var /** @type {?} */ marginLeft = parseInt(/** @type {?} */ (getComputedStyle(this.nsmContent.first.nativeElement).marginLeft), 10);
        var /** @type {?} */ marginTop = parseInt(/** @type {?} */ (getComputedStyle(this.nsmContent.first.nativeElement).marginTop), 10);
        var /** @type {?} */ offsetTop = targetElementRect.top - nsmDialogRect.top - ((nsmContentRect.height - targetElementRect.height) / 2);
        var /** @type {?} */ offsetLeft = targetElementRect.left - nsmDialogRect.left - ((nsmContentRect.width - targetElementRect.width) / 2);
        if (offsetLeft + nsmDialogRect.left + nsmContentRect.width + (marginLeft * 2) > bodyRect.width) {
            offsetLeft = bodyRect.width - (nsmDialogRect.left + nsmContentRect.width) - (marginLeft * 2);
        }
        else if (offsetLeft + nsmDialogRect.left < 0) {
            offsetLeft = -nsmDialogRect.left;
        }
        if (offsetTop + nsmDialogRect.top + nsmContentRect.height + marginTop > bodyRect.height) {
            offsetTop = bodyRect.height - (nsmDialogRect.top + nsmContentRect.height) - marginTop;
        }
        this._renderer.setStyle(this.nsmContent.first.nativeElement, 'top', (offsetTop < 0 ? 0 : offsetTop) + 'px');
        this._renderer.setStyle(this.nsmContent.first.nativeElement, 'left', offsetLeft + 'px');
    };
    /**
     * @param {?} name
     * @param {?=} extraData
     * @return {?}
     */
    NgxSmartModalComponent.prototype._sendEvent = /**
     * @param {?} name
     * @param {?=} extraData
     * @return {?}
     */
    function (name, extraData) {
        if (!this.isBrowser) {
            return false;
        }
        var /** @type {?} */ data = {
            extraData: extraData,
            instance: { id: this.identifier, modal: this }
        };
        var /** @type {?} */ event = new CustomEvent(NgxSmartModalConfig.prefixEvent + name, { detail: data });
        return window.dispatchEvent(event);
    };
    Object.defineProperty(NgxSmartModalComponent.prototype, "isBrowser", {
        get: /**
         * Is current platform browser
         * @return {?}
         */
        function () {
            return isPlatformBrowser(this._platformId);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates content inside provided ViewContainerRef
     * @param {?} changes
     * @param {?} factory
     * @return {?}
     */
    NgxSmartModalComponent.prototype.createDynamicContent = /**
     * Creates content inside provided ViewContainerRef
     * @param {?} changes
     * @param {?} factory
     * @return {?}
     */
    function (changes, factory) {
        var _this = this;
        changes.forEach(function (viewContainerRef) {
            viewContainerRef.clear();
            viewContainerRef.createComponent(factory);
            _this.markForCheck();
        });
    };
    NgxSmartModalComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-smart-modal',
                    template: "\n    <div *ngIf=\"overlayVisible\"\n         [style.z-index]=\"visible ? layerPosition-1 : -1\"\n         [ngClass]=\"{'transparent':!backdrop, 'overlay':true, 'nsm-overlay-open':openedClass}\"\n         (mousedown)=\"dismiss($event)\" #nsmOverlay>\n      <div [style.z-index]=\"visible ? layerPosition : -1\"\n           [ngClass]=\"['nsm-dialog', customClass, openedClass ? 'nsm-dialog-open': 'nsm-dialog-close']\" #nsmDialog\n           [attr.aria-hidden]=\"openedClass ? false : true\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledBy\"\n           [attr.aria-describedby]=\"ariaDescribedBy\">\n        <div class=\"nsm-content\" #nsmContent>\n          <div class=\"nsm-body\">\n            <ng-template #dynamicContent></ng-template>\n            <ng-content></ng-content>\n\n          </div>\n          <button type=\"button\" *ngIf=\"closable\" (click)=\"close()\" aria-label=\"Close\" class=\"nsm-dialog-btn-close\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" id=\"Layer_1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\"\n                 xml:space=\"preserve\" width=\"16px\" height=\"16px\">\n              <g>\n                <path d=\"M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249    C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306    C514.019,27.23,514.019,14.135,505.943,6.058z\"\n                      fill=\"currentColor\"/>\n              </g>\n              <g>\n                <path d=\"M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636    c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z\"\n                      fill=\"currentColor\"/>\n              </g>\n            </svg>\n          </button>\n        </div>\n      </div>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    NgxSmartModalComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ChangeDetectorRef, },
        { type: ComponentFactoryResolver, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    ]; };
    NgxSmartModalComponent.propDecorators = {
        "closable": [{ type: Input },],
        "escapable": [{ type: Input },],
        "dismissable": [{ type: Input },],
        "identifier": [{ type: Input },],
        "customClass": [{ type: Input },],
        "visible": [{ type: Input },],
        "backdrop": [{ type: Input },],
        "force": [{ type: Input },],
        "hideDelay": [{ type: Input },],
        "autostart": [{ type: Input },],
        "target": [{ type: Input },],
        "ariaLabel": [{ type: Input },],
        "ariaLabelledBy": [{ type: Input },],
        "ariaDescribedBy": [{ type: Input },],
        "visibleChange": [{ type: Output },],
        "onClose": [{ type: Output },],
        "onCloseFinished": [{ type: Output },],
        "onDismiss": [{ type: Output },],
        "onDismissFinished": [{ type: Output },],
        "onAnyCloseEvent": [{ type: Output },],
        "onAnyCloseEventFinished": [{ type: Output },],
        "onOpen": [{ type: Output },],
        "onOpenFinished": [{ type: Output },],
        "onEscape": [{ type: Output },],
        "onDataAdded": [{ type: Output },],
        "onDataRemoved": [{ type: Output },],
        "nsmContent": [{ type: ViewChildren, args: ['nsmContent',] },],
        "nsmDialog": [{ type: ViewChildren, args: ['nsmDialog',] },],
        "nsmOverlay": [{ type: ViewChildren, args: ['nsmOverlay',] },],
        "dynamicContentContainer": [{ type: ViewChildren, args: ['dynamicContent', { read: ViewContainerRef },] },],
        "targetPlacement": [{ type: HostListener, args: ['window:resize',] },],
    };
    return NgxSmartModalComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSmartModalStackService = (function () {
    function NgxSmartModalStackService() {
        this._modalStack = [];
    }
    /**
     * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
     * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
     *
     * @param {?} modalInstance The object that contains the given modal identifier and the modal itself.
     * @param {?=} force Optional parameter that forces the overriding of modal instance if it already exists.
     * @return {?} nothing special.
     */
    NgxSmartModalStackService.prototype.addModal = /**
     * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
     * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
     *
     * @param {?} modalInstance The object that contains the given modal identifier and the modal itself.
     * @param {?=} force Optional parameter that forces the overriding of modal instance if it already exists.
     * @return {?} nothing special.
     */
    function (modalInstance, force) {
        if (force) {
            var /** @type {?} */ i = this._modalStack.findIndex(function (o) { return o.id === modalInstance.id; });
            if (i > -1) {
                this._modalStack[i].modal = modalInstance.modal;
            }
            else {
                this._modalStack.push(modalInstance);
            }
            return;
        }
        this._modalStack.push(modalInstance);
    };
    /**
     * Retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    NgxSmartModalStackService.prototype.getModal = /**
     * Retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    function (id) {
        var /** @type {?} */ i = this._modalStack.find(function (o) { return o.id === id; });
        if (i !== undefined) {
            return i.modal;
        }
        else {
            throw new Error("Cannot find modal with identifier " + id);
        }
    };
    /**
     * Retrieve all the created modals.
     *
     * @return {?} an array that contains all modal instances.
     */
    NgxSmartModalStackService.prototype.getModalStack = /**
     * Retrieve all the created modals.
     *
     * @return {?} an array that contains all modal instances.
     */
    function () {
        return this._modalStack;
    };
    /**
     * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
     *
     * @return {?} an array that contains all the opened modals.
     */
    NgxSmartModalStackService.prototype.getOpenedModals = /**
     * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
     *
     * @return {?} an array that contains all the opened modals.
     */
    function () {
        return this._modalStack.filter(function (o) { return o.modal.visible; });
    };
    /**
     * Retrieve the opened modal with highest z-index.
     *
     * @return {?} the opened modal with highest z-index.
     */
    NgxSmartModalStackService.prototype.getTopOpenedModal = /**
     * Retrieve the opened modal with highest z-index.
     *
     * @return {?} the opened modal with highest z-index.
     */
    function () {
        if (!this.getOpenedModals().length) {
            throw new Error('No modal is opened');
        }
        return this.getOpenedModals()
            .map(function (o) { return o.modal; })
            .reduce(function (highest, item) { return item.layerPosition > highest.layerPosition ? item : highest; }, this.getOpenedModals()[0].modal);
    };
    /**
     * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
     * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
     * Use it to make a modal appear foreground.
     *
     * @return {?} a higher index from all the existing modal instances.
     */
    NgxSmartModalStackService.prototype.getHigherIndex = /**
     * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
     * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
     * Use it to make a modal appear foreground.
     *
     * @return {?} a higher index from all the existing modal instances.
     */
    function () {
        return Math.max.apply(Math, this._modalStack.map(function (o) { return o.modal.layerPosition; }).concat([1041])) + 1;
    };
    /**
     * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
     *
     * @return {?} the number of modal instances.
     */
    NgxSmartModalStackService.prototype.getModalStackCount = /**
     * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
     *
     * @return {?} the number of modal instances.
     */
    function () {
        return this._modalStack.length;
    };
    /**
     * Remove a modal instance from the modal stack.
     *
     * @param {?} id The modal identifier.
     * @return {?} the removed modal instance.
     */
    NgxSmartModalStackService.prototype.removeModal = /**
     * Remove a modal instance from the modal stack.
     *
     * @param {?} id The modal identifier.
     * @return {?} the removed modal instance.
     */
    function (id) {
        var /** @type {?} */ i = this._modalStack.findIndex(function (o) { return o.id === id; });
        if (i > -1) {
            this._modalStack.splice(i, 1);
        }
    };
    NgxSmartModalStackService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgxSmartModalStackService.ctorParameters = function () { return []; };
    return NgxSmartModalStackService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSmartModalService = (function () {
    function NgxSmartModalService(_componentFactoryResolver, _appRef, _injector, _modalStack, applicationRef, _document, 
        // Do not use the `Document` interface, which cause problem with AoT compilation.
        _platformId) {
        var _this = this;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
        this._injector = _injector;
        this._modalStack = _modalStack;
        this.applicationRef = applicationRef;
        this._document = _document;
        this._platformId = _platformId;
        /**
         * Close the latest opened modal if escape key event is emitted
         * @param event The Keyboard Event
         */
        this._escapeKeyboardEvent = function (event) {
            if (event.key === 'Escape') {
                try {
                    var /** @type {?} */ modal = _this.getTopOpenedModal();
                    if (!modal.escapable) {
                        return false;
                    }
                    modal.onEscape.emit(modal);
                    _this.closeLatestModal();
                    return true;
                }
                catch (/** @type {?} */ e) {
                    return false;
                }
            }
            return false;
        };
        /**
         * While modal is open, the focus stay on it
         * @param event The Keyboar dEvent
         */
        this._trapFocusModal = function (event) {
            if (event.key === 'Tab') {
                try {
                    var /** @type {?} */ modal = _this.getTopOpenedModal();
                    if (!modal.nsmDialog.first.nativeElement.contains(document.activeElement)) {
                        event.preventDefault();
                        event.stopPropagation();
                        modal.nsmDialog.first.nativeElement.focus();
                    }
                    return true;
                }
                catch (/** @type {?} */ e) {
                    return false;
                }
            }
            return false;
        };
        this._addEvents();
    }
    /**
     * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
     * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
     *
     * @param {?} modalInstance The object that contains the given modal identifier and the modal itself.
     * @param {?=} force Optional parameter that forces the overriding of modal instance if it already exists.
     * @return {?} nothing special.
     */
    NgxSmartModalService.prototype.addModal = /**
     * Add a new modal instance. This step is essential and allows to retrieve any modal at any time.
     * It stores an object that contains the given modal identifier and the modal itself directly in the `modalStack`.
     *
     * @param {?} modalInstance The object that contains the given modal identifier and the modal itself.
     * @param {?=} force Optional parameter that forces the overriding of modal instance if it already exists.
     * @return {?} nothing special.
     */
    function (modalInstance, force) {
        this._modalStack.addModal(modalInstance, force);
    };
    /**
     * Retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    NgxSmartModalService.prototype.getModal = /**
     * Retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    function (id) {
        return this._modalStack.getModal(id);
    };
    /**
     * Alias of `getModal` to retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    NgxSmartModalService.prototype.get = /**
     * Alias of `getModal` to retrieve a modal instance by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    function (id) {
        return this.getModal(id);
    };
    /**
     * Open a given modal
     *
     * @param {?} id The modal identifier used at creation time.
     * @param {?=} force Tell the modal to open top of all other opened modals
     * @return {?}
     */
    NgxSmartModalService.prototype.open = /**
     * Open a given modal
     *
     * @param {?} id The modal identifier used at creation time.
     * @param {?=} force Tell the modal to open top of all other opened modals
     * @return {?}
     */
    function (id, force) {
        if (force === void 0) { force = false; }
        return this._openModal(this.get(id), force);
    };
    /**
     * Close a given modal
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    NgxSmartModalService.prototype.close = /**
     * Close a given modal
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?}
     */
    function (id) {
        return this._closeModal(this.get(id));
    };
    /**
     * Close all opened modals
     * @return {?}
     */
    NgxSmartModalService.prototype.closeAll = /**
     * Close all opened modals
     * @return {?}
     */
    function () {
        var _this = this;
        this.getOpenedModals().forEach(function (instance) {
            _this._closeModal(instance.modal);
        });
    };
    /**
     * Toggles a given modal
     * If the retrieved modal is opened it closes it, else it opens it.
     *
     * @param {?} id The modal identifier used at creation time.
     * @param {?=} force Tell the modal to open top of all other opened modals
     * @return {?}
     */
    NgxSmartModalService.prototype.toggle = /**
     * Toggles a given modal
     * If the retrieved modal is opened it closes it, else it opens it.
     *
     * @param {?} id The modal identifier used at creation time.
     * @param {?=} force Tell the modal to open top of all other opened modals
     * @return {?}
     */
    function (id, force) {
        if (force === void 0) { force = false; }
        return this._toggleModal(this.get(id), force);
    };
    /**
     * Retrieve all the created modals.
     *
     * @return {?} an array that contains all modal instances.
     */
    NgxSmartModalService.prototype.getModalStack = /**
     * Retrieve all the created modals.
     *
     * @return {?} an array that contains all modal instances.
     */
    function () {
        return this._modalStack.getModalStack();
    };
    /**
     * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
     *
     * @return {?} an array that contains all the opened modals.
     */
    NgxSmartModalService.prototype.getOpenedModals = /**
     * Retrieve all the opened modals. It looks for all modal instances with their `visible` property set to `true`.
     *
     * @return {?} an array that contains all the opened modals.
     */
    function () {
        return this._modalStack.getOpenedModals();
    };
    /**
     * Retrieve the opened modal with highest z-index.
     *
     * @return {?} the opened modal with highest z-index.
     */
    NgxSmartModalService.prototype.getTopOpenedModal = /**
     * Retrieve the opened modal with highest z-index.
     *
     * @return {?} the opened modal with highest z-index.
     */
    function () {
        return this._modalStack.getTopOpenedModal();
    };
    /**
     * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
     * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
     * Use it to make a modal appear foreground.
     *
     * @return {?} a higher index from all the existing modal instances.
     */
    NgxSmartModalService.prototype.getHigherIndex = /**
     * Get the higher `z-index` value between all the modal instances. It iterates over the `ModalStack` array and
     * calculates a higher value (it takes the highest index value between all the modal instances and adds 1).
     * Use it to make a modal appear foreground.
     *
     * @return {?} a higher index from all the existing modal instances.
     */
    function () {
        return this._modalStack.getHigherIndex();
    };
    /**
     * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
     *
     * @return {?} the number of modal instances.
     */
    NgxSmartModalService.prototype.getModalStackCount = /**
     * It gives the number of modal instances. It's helpful to know if the modal stack is empty or not.
     *
     * @return {?} the number of modal instances.
     */
    function () {
        return this._modalStack.getModalStackCount();
    };
    /**
     * Remove a modal instance from the modal stack.
     *
     * @param {?} id The modal identifier.
     * @return {?} the removed modal instance.
     */
    NgxSmartModalService.prototype.removeModal = /**
     * Remove a modal instance from the modal stack.
     *
     * @param {?} id The modal identifier.
     * @return {?} the removed modal instance.
     */
    function (id) {
        this._modalStack.removeModal(id);
    };
    /**
     * Associate data to an identified modal. If the modal isn't already associated to some data, it creates a new
     * entry in the `modalData` array with its `id` and the given `data`. If the modal already has data, it rewrites
     * them with the new ones. Finally if no modal found it returns an error message in the console and false value
     * as method output.
     *
     * @param {?} data The data you want to associate to the modal.
     * @param {?} id The modal identifier.
     * @param {?=} force If true, overrides the previous stored data if there was.
     * @return {?} true if the given modal exists and the process has been tried, either false.
     */
    NgxSmartModalService.prototype.setModalData = /**
     * Associate data to an identified modal. If the modal isn't already associated to some data, it creates a new
     * entry in the `modalData` array with its `id` and the given `data`. If the modal already has data, it rewrites
     * them with the new ones. Finally if no modal found it returns an error message in the console and false value
     * as method output.
     *
     * @param {?} data The data you want to associate to the modal.
     * @param {?} id The modal identifier.
     * @param {?=} force If true, overrides the previous stored data if there was.
     * @return {?} true if the given modal exists and the process has been tried, either false.
     */
    function (data, id, force) {
        var /** @type {?} */ i;
        if (i = this.get(id)) {
            i.setData(data, force);
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Retrieve modal data by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?} the associated modal data.
     */
    NgxSmartModalService.prototype.getModalData = /**
     * Retrieve modal data by its identifier.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?} the associated modal data.
     */
    function (id) {
        var /** @type {?} */ i;
        if (i = this.get(id)) {
            return i.getData();
        }
        return null;
    };
    /**
     * Reset the data attached to a given modal.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?} the removed data or false if modal doesn't exist.
     */
    NgxSmartModalService.prototype.resetModalData = /**
     * Reset the data attached to a given modal.
     *
     * @param {?} id The modal identifier used at creation time.
     * @return {?} the removed data or false if modal doesn't exist.
     */
    function (id) {
        if (!!this._modalStack.getModalStack().find(function (o) { return o.id === id; })) {
            var /** @type {?} */ removed = this.getModal(id).getData();
            this.getModal(id).removeData();
            return removed;
        }
        else {
            return false;
        }
    };
    /**
     * Close the latest opened modal if it has been declared as escapable
     * Using a debounce system because one or more modals could be listening
     * escape key press event.
     * @return {?}
     */
    NgxSmartModalService.prototype.closeLatestModal = /**
     * Close the latest opened modal if it has been declared as escapable
     * Using a debounce system because one or more modals could be listening
     * escape key press event.
     * @return {?}
     */
    function () {
        this.getTopOpenedModal().close();
    };
    /**
     * Create dynamic NgxSmartModalComponent
     * @template T
     * @param {?} id The modal identifier used at creation time.
     * @param {?} content The modal content ( string, templateRef or Component )
     * @param {?=} options
     * @return {?}
     */
    NgxSmartModalService.prototype.create = /**
     * Create dynamic NgxSmartModalComponent
     * @template T
     * @param {?} id The modal identifier used at creation time.
     * @param {?} content The modal content ( string, templateRef or Component )
     * @param {?=} options
     * @return {?}
     */
    function (id, content, options) {
        if (options === void 0) { options = {}; }
        try {
            return this.getModal(id);
        }
        catch (/** @type {?} */ e) {
            var /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(NgxSmartModalComponent);
            var /** @type {?} */ ngContent = this._resolveNgContent(content, id);
            var /** @type {?} */ modalNodes = this._getModalNodes(ngContent);
            console.log('Create', { ngContent: ngContent, modalNodes: modalNodes });
            var /** @type {?} */ componentRef = componentFactory.create(this._injector, modalNodes);
            if (content instanceof Type) {
                componentRef.instance.contentComponent = content;
            }
            componentRef.instance.identifier = id;
            componentRef.instance.createFrom = 'service';
            if (typeof options.closable === 'boolean') {
                componentRef.instance.closable = options.closable;
            }
            if (typeof options.escapable === 'boolean') {
                componentRef.instance.escapable = options.escapable;
            }
            if (typeof options.dismissable === 'boolean') {
                componentRef.instance.dismissable = options.dismissable;
            }
            if (typeof options.customClass === 'string') {
                componentRef.instance.customClass = options.customClass;
            }
            if (typeof options.backdrop === 'boolean') {
                componentRef.instance.backdrop = options.backdrop;
            }
            if (typeof options.force === 'boolean') {
                componentRef.instance.force = options.force;
            }
            if (typeof options.hideDelay === 'number') {
                componentRef.instance.hideDelay = options.hideDelay;
            }
            if (typeof options.autostart === 'boolean') {
                componentRef.instance.autostart = options.autostart;
            }
            if (typeof options.target === 'string') {
                componentRef.instance.target = options.target;
            }
            if (typeof options.ariaLabel === 'string') {
                componentRef.instance.ariaLabel = options.ariaLabel;
            }
            if (typeof options.ariaLabelledBy === 'string') {
                componentRef.instance.ariaLabelledBy = options.ariaLabelledBy;
            }
            if (typeof options.ariaDescribedBy === 'string') {
                componentRef.instance.ariaDescribedBy = options.ariaDescribedBy;
            }
            this._appRef.attachView(componentRef.hostView);
            var /** @type {?} */ domElem = /** @type {?} */ ((/** @type {?} */ (componentRef.hostView)).rootNodes[0]);
            this._document.body.appendChild(domElem);
            return componentRef.instance;
        }
    };
    /**
     * @return {?}
     */
    NgxSmartModalService.prototype._addEvents = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.isBrowser) {
            return false;
        }
        window.addEventListener(NgxSmartModalConfig.prefixEvent + 'create', /** @type {?} */ ((function (e) {
            _this._initModal(e.detail.instance);
        })));
        window.addEventListener(NgxSmartModalConfig.prefixEvent + 'delete', /** @type {?} */ ((function (e) {
            _this._deleteModal(e.detail.instance);
        })));
        window.addEventListener(NgxSmartModalConfig.prefixEvent + 'open', /** @type {?} */ ((function (e) {
            _this._openModal(e.detail.instance.modal, e.detail.top);
        })));
        window.addEventListener(NgxSmartModalConfig.prefixEvent + 'toggle', /** @type {?} */ ((function (e) {
            _this._toggleModal(e.detail.instance.modal, e.detail.top);
        })));
        window.addEventListener(NgxSmartModalConfig.prefixEvent + 'close', /** @type {?} */ ((function (e) {
            _this._closeModal(e.detail.instance.modal);
        })));
        window.addEventListener(NgxSmartModalConfig.prefixEvent + 'dismiss', /** @type {?} */ ((function (e) {
            _this._dismissModal(e.detail.instance.modal);
        })));
        window.addEventListener('keyup', this._escapeKeyboardEvent);
        return true;
    };
    /**
     * @param {?} modalInstance
     * @return {?}
     */
    NgxSmartModalService.prototype._initModal = /**
     * @param {?} modalInstance
     * @return {?}
     */
    function (modalInstance) {
        modalInstance.modal.layerPosition += this.getModalStackCount();
        this.addModal(modalInstance, modalInstance.modal.force);
        if (modalInstance.modal.autostart) {
            this.open(modalInstance.id);
        }
    };
    /**
     * @param {?} modal
     * @param {?=} top
     * @return {?}
     */
    NgxSmartModalService.prototype._openModal = /**
     * @param {?} modal
     * @param {?=} top
     * @return {?}
     */
    function (modal, top) {
        if (modal.visible) {
            return false;
        }
        this.lastElementFocused = document.activeElement;
        if (modal.escapable) {
            window.addEventListener('keyup', this._escapeKeyboardEvent);
        }
        if (modal.backdrop) {
            window.addEventListener('keydown', this._trapFocusModal);
        }
        if (top) {
            modal.layerPosition = this.getHigherIndex();
        }
        modal.addBodyClass();
        modal.overlayVisible = true;
        modal.visible = true;
        modal.onOpen.emit(modal);
        modal.markForCheck();
        setTimeout(function () {
            modal.openedClass = true;
            if (modal.target) {
                modal.targetPlacement();
            }
            modal.nsmDialog.first.nativeElement.setAttribute('role', 'dialog');
            modal.nsmDialog.first.nativeElement.setAttribute('tabIndex', '-1');
            modal.nsmDialog.first.nativeElement.setAttribute('aria-modal', 'true');
            modal.nsmDialog.first.nativeElement.focus();
            modal.markForCheck();
            modal.onOpenFinished.emit(modal);
        });
        return true;
    };
    /**
     * @param {?} modal
     * @param {?=} top
     * @return {?}
     */
    NgxSmartModalService.prototype._toggleModal = /**
     * @param {?} modal
     * @param {?=} top
     * @return {?}
     */
    function (modal, top) {
        if (modal.visible) {
            return this._closeModal(modal);
        }
        else {
            return this._openModal(modal, top);
        }
    };
    /**
     * @param {?} modal
     * @return {?}
     */
    NgxSmartModalService.prototype._closeModal = /**
     * @param {?} modal
     * @return {?}
     */
    function (modal) {
        var _this = this;
        if (!modal.openedClass) {
            return false;
        }
        modal.openedClass = false;
        modal.onClose.emit(modal);
        modal.onAnyCloseEvent.emit(modal);
        if (this.getOpenedModals().length < 2) {
            modal.removeBodyClass();
            window.removeEventListener('keyup', this._escapeKeyboardEvent);
            window.removeEventListener('keydown', this._trapFocusModal);
        }
        setTimeout(function () {
            modal.visibleChange.emit(modal.visible);
            modal.visible = false;
            modal.overlayVisible = false;
            modal.nsmDialog.first.nativeElement.removeAttribute('tabIndex');
            modal.markForCheck();
            modal.onCloseFinished.emit(modal);
            modal.onAnyCloseEventFinished.emit(modal);
            _this.lastElementFocused.focus();
        }, modal.hideDelay);
        return true;
    };
    /**
     * @param {?} modal
     * @return {?}
     */
    NgxSmartModalService.prototype._dismissModal = /**
     * @param {?} modal
     * @return {?}
     */
    function (modal) {
        if (!modal.openedClass) {
            return false;
        }
        modal.openedClass = false;
        modal.onDismiss.emit(modal);
        modal.onAnyCloseEvent.emit(modal);
        if (this.getOpenedModals().length < 2) {
            modal.removeBodyClass();
        }
        setTimeout(function () {
            modal.visible = false;
            modal.visibleChange.emit(modal.visible);
            modal.overlayVisible = false;
            modal.markForCheck();
            modal.onDismissFinished.emit(modal);
            modal.onAnyCloseEventFinished.emit(modal);
        }, modal.hideDelay);
        return true;
    };
    /**
     * @param {?} modalInstance
     * @return {?}
     */
    NgxSmartModalService.prototype._deleteModal = /**
     * @param {?} modalInstance
     * @return {?}
     */
    function (modalInstance) {
        this.removeModal(modalInstance.id);
        if (!this.getModalStack().length) {
            modalInstance.modal.removeBodyClass();
        }
    };
    /**
     * Resolve content according to the types
     * @template T
     * @param {?} content The modal content ( string, templateRef or Component )
     * @param {?} id
     * @return {?}
     */
    NgxSmartModalService.prototype._resolveNgContent = /**
     * Resolve content according to the types
     * @template T
     * @param {?} content The modal content ( string, templateRef or Component )
     * @param {?} id
     * @return {?}
     */
    function (content, id) {
        if (typeof content === 'string') {
            var /** @type {?} */ element = this._document.createTextNode(content);
            return element;
        }
        else if (content instanceof TemplateRef) {
            var /** @type {?} */ viewRef = content.createEmbeddedView(/** @type {?} */ ({ foo: 'wololo' }));
            this.applicationRef.attachView(viewRef);
            return viewRef;
        }
        else {
            return content;
        }
    };
    /**
     * Resolve content according to the types
     * @template T
     * @param {?} content The modal content ( string, templateRef or Component )
     * @return {?}
     */
    NgxSmartModalService.prototype._getModalNodes = /**
     * Resolve content according to the types
     * @template T
     * @param {?} content The modal content ( string, templateRef or Component )
     * @return {?}
     */
    function (content) {
        if (content instanceof Type) {
            return [];
        }
        else if (content instanceof EmbeddedViewRef) {
            return [content.rootNodes];
        }
        else {
            return [[content]];
        }
    };
    Object.defineProperty(NgxSmartModalService.prototype, "isBrowser", {
        get: /**
         * Is current platform browser
         * @return {?}
         */
        function () {
            return isPlatformBrowser(this._platformId);
        },
        enumerable: true,
        configurable: true
    });
    NgxSmartModalService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    NgxSmartModalService.ctorParameters = function () { return [
        { type: ComponentFactoryResolver, },
        { type: ApplicationRef, },
        { type: Injector, },
        { type: NgxSmartModalStackService, },
        { type: ApplicationRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] },] },
    ]; };
    return NgxSmartModalService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var NgxSmartModalModule = (function () {
    function NgxSmartModalModule(serivce) {
        this.serivce = serivce;
    }
    /**
     * Use in AppModule: new instance of NgxSmartModal.
     * @return {?}
     */
    NgxSmartModalModule.forRoot = /**
     * Use in AppModule: new instance of NgxSmartModal.
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxSmartModalModule,
            providers: [
                NgxSmartModalService,
                NgxSmartModalStackService
            ]
        };
    };
    /**
     * Use in features modules with lazy loading: new instance of NgxSmartModal.
     * @return {?}
     */
    NgxSmartModalModule.forChild = /**
     * Use in features modules with lazy loading: new instance of NgxSmartModal.
     * @return {?}
     */
    function () {
        return {
            ngModule: NgxSmartModalModule,
            providers: [
                NgxSmartModalService,
                NgxSmartModalStackService
            ]
        };
    };
    NgxSmartModalModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [NgxSmartModalComponent],
                    entryComponents: [NgxSmartModalComponent],
                    exports: [NgxSmartModalComponent],
                    imports: [CommonModule]
                },] },
    ];
    /** @nocollapse */
    NgxSmartModalModule.ctorParameters = function () { return [
        { type: NgxSmartModalService, },
    ]; };
    return NgxSmartModalModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Public classes.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Entry point for all public APIs of the package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { NgxSmartModalService, NgxSmartModalComponent, NgxSmartModalModule, NgxSmartModalConfig, NgxSmartModalStackService as ɵa };
//# sourceMappingURL=ngx-smart-modal.js.map
