﻿/// <reference path="../../jasmine.d.ts" />
/// <chutzpah_reference path="jasmine.js" />

describe("Model", () => {

    let core = new spaMVP.Core();
    core.useMVP();

    class TestModel extends core.mvp.Model {
        constructor() {
            super();
        }
    }

    it("should not accept listener when event type is invalid string", () => {
        let model = new TestModel();
        let spy = jasmine.createSpyObj("spy", ["listener"]);

        expect(model.on("", spy.listener)).toBeFalsy();
        expect(model.on(null, spy.listener)).toBeFalsy();
        expect(model.on(undefined, spy.listener)).toBeFalsy();
    });

    it("should accept listener when event type is valid string", () => {
        let model = new TestModel();
        let spy = jasmine.createSpyObj("spy", ["listener"]);

        expect(model.on("change", spy.listener)).toBeTruthy();
    });

    it("should notify without data when there is attached listener", () => {
        let model = new TestModel();
        let spy = jasmine.createSpyObj("spy", ["listener"]);
        let event = "something";
        model.on(event, spy.listener);

        model.notify(event);

        expect(spy.listener).toHaveBeenCalledWith(undefined);
    });

    it("should notify with data when there is attached listener", () => {
        let model = new TestModel();
        let spy = jasmine.createSpyObj("spy", ["listener"]);
        let event = "something";
        model.on(event, spy.listener);

        model.notify(event, 8);

        expect(spy.listener).toHaveBeenCalledWith(8);
    });

    it("should notify when there is attached listener with given context", () => {
        let model = new TestModel();
        let context = null;
        let action = function (): void { context = this; };
        let event = "something";
        model.on(event, action, model);

        model.notify(event);

        expect(context).toBe(model);
    });

    it("should notify when having multiple listeners", () => {
        let model = new TestModel();
        let spy = jasmine.createSpyObj("spy", ["save", "remove", "insert"]);
        let event = "something";
        model.on(event, spy.save);
        model.on(event, spy.remove);
        model.on(event, spy.insert);

        model.notify(event);

        expect(spy.save).toHaveBeenCalledTimes(1);
        expect(spy.remove).toHaveBeenCalledTimes(1);
        expect(spy.insert).toHaveBeenCalledTimes(1);
    });

    it("should notify for change with specific string and data", () => {
        let model = new TestModel();
        let spy = jasmine.createSpyObj("spy", ["handler"]);
        model.on(spaMVP.Hidden.Model.Events.Change, spy.handler);

        model.change();

        expect(spy.handler).toHaveBeenCalledWith(model);
    });

    it("should notify for destroy with specific string and data", () => {
        let model = new TestModel();
        let spy = jasmine.createSpyObj("spy", ["handler"]);
        model.on(spaMVP.Hidden.Model.Events.Destroy, spy.handler);

        model.destroy();

        expect(spy.handler).toHaveBeenCalledWith(model);
    });

    it("should return false when try to detach unattached listener", () => {
        let model = new TestModel();

        let result = model.off(spaMVP.Hidden.Model.Events.Change, () => -1);

        expect(result).toBeFalsy();
    });

    it("should return true when successfully detach a listener", () => {
        let model = new TestModel();
        let spy = jasmine.createSpyObj("spy", ["handler"]);
        model.on(spaMVP.Hidden.Model.Events.Change, spy.handler);

        let result = model.off(spaMVP.Hidden.Model.Events.Change, spy.handler);

        expect(result).toBeTruthy();
    });

    it("should return true when successfully detach a listener passed with given context", () => {
        let model = new TestModel();
        let spy = jasmine.createSpyObj("spy", ["handler"]);
        model.on(spaMVP.Hidden.Model.Events.Change, spy.handler, model);

        let falsyResult = model.off(spaMVP.Hidden.Model.Events.Change, spy.handler);
        let result = model.off(spaMVP.Hidden.Model.Events.Change, spy.handler, model);

        expect(falsyResult).toBeFalsy();
        expect(result).toBeTruthy();
    });

    it("should not invoke already detached listener", () => {
        let model = new TestModel();
        let spy = jasmine.createSpyObj("spy", ["handler"]);
        model.on(spaMVP.Hidden.Model.Events.Change, spy.handler);

        let result = model.off(spaMVP.Hidden.Model.Events.Change, spy.handler);
        model.change();

        expect(result).toBeTruthy();
        expect(spy.handler).not.toHaveBeenCalled();
    });
});