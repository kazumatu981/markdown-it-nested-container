const { describe, it } = require("mocha");
const { expect } = require("chai");
const { DEFAULT_CONTAINER_DFINE_JSONS, isContainerDefineJson, isContainerDefineJsons } = require("../../lib/container-definie-json");

describe('[module test]: container-definie-json', () => {
    describe('DEFAULT_CONTAINER_DFINE_JSONS', () => {
        it('DEFAULT_CONTAINER_DFINE_JSONS must be Container Define Jsons.', () => {
            const test = DEFAULT_CONTAINER_DFINE_JSONS;

            const actual = isContainerDefineJsons(test);

            expect(actual).to.be.true;
        });
    });
    describe('isContainerDefineJson()', () => {
        it('full-fill definition must return ture.', () => {
            const test = {
                containerName: 'grid',
                options: {
                    marker: ':',
                    render: () => { },
                    validate: () => { }
                }
            };
            const actual = isContainerDefineJson(test);

            expect(actual).to.be.true;
        });
        it('can abbreve render', () => {
            const test = {
                containerName: 'grid',
                options: {
                    marker: ':',
                    validate: () => { }
                }
            };
            const actual = isContainerDefineJson(test);

            expect(actual).to.be.true;
        })
        it('can abbreve validate', () => {
            const test = {
                containerName: 'grid',
                options: {
                    marker: ':',
                    render: () => { },
                }
            };
            const actual = isContainerDefineJson(test);

            expect(actual).to.be.true;
        });
        it('can abbreve render and validate', () => {
            const test = {
                containerName: 'grid',
                options: {
                    marker: ':'
                }
            };
            const actual = isContainerDefineJson(test);

            expect(actual).to.be.true;
        });
        describe('error cases', () => {
            describe('object error case', () => {
                it('if undefined return false', () => {
                    const test = undefined;
                    const actual = isContainerDefineJson(test);

                    expect(actual).to.be.false;
                });

                it('if non-object return false', () => {
                    const test = 1;
                    const actual = isContainerDefineJson(test);

                    expect(actual).to.be.false;
                });
            })
            describe('containerName error cases', () => {
                it('when contanerName was abbreved return false', () => {
                    const test = {
                        options: {
                            marker: ':'
                        }
                    };
                    const actual = isContainerDefineJson(test);

                    expect(actual).to.be.false;
                });
                it('if contanerName is non-string return false', () => {
                    const test = {
                        containerName: 123,
                        options: {
                            marker: ':'
                        }
                    };
                    const actual = isContainerDefineJson(test);

                    expect(actual).to.be.false;
                });
                it('if contanerName is non-className return false', () => {
                    const test = {
                        containerName: 'grid  123',
                        options: {
                            marker: ':'
                        }
                    };
                    const actual = isContainerDefineJson(test);

                    expect(actual).to.be.false;
                });
            });
            describe('options error cases', () => {
                it('options is non object return false', () => {
                    const test = {
                        containerName: 'grid',
                        options: 1
                    };
                    const actual = isContainerDefineJson(test);

                    expect(actual).to.be.false;
                });
                it('no options return false', () => {
                    const test = {
                        containerName: 'grid',
                    };
                    const actual = isContainerDefineJson(test);

                    expect(actual).to.be.false;
                });
                describe('marker error cases', () => {
                    it('no marker return false', () => {
                        const test = {
                            containerName: 'grid',
                            options: {
                            }
                        };
                        const actual = isContainerDefineJson(test);

                        expect(actual).to.be.false;
                    });
                    it('marker is not string return false', () => {
                        const test = {
                            containerName: 'grid',
                            options: {
                                marker: 1,
                            }
                        };
                        const actual = isContainerDefineJson(test);

                        expect(actual).to.be.false;
                    });

                    it('marker is empty string return false', () => {
                        const test = {
                            containerName: 'grid',
                            options: {
                                marker: "",
                            }
                        };
                        const actual = isContainerDefineJson(test);

                        expect(actual).to.be.false;
                    });
                    it('marker is long string return false', () => {
                        const test = {
                            containerName: 'grid',
                            options: {
                                marker: "abc",
                            }
                        };
                        const actual = isContainerDefineJson(test);

                        expect(actual).to.be.false;
                    });
                });
                describe('validate error cases', () => {
                    it('render is not function return false', () => {
                        const test = {
                            containerName: 'grid',
                            options: {
                                marker: ':',
                                validate: 0,
                                render: () => { },
                            }
                        };
                        const actual = isContainerDefineJson(test);

                        expect(actual).to.be.false;
                    });
                });
                describe('render error cases', () => {
                    it('render is not function return false', () => {
                        const test = {
                            containerName: 'grid',
                            options: {
                                marker: ':',
                                validate: () => { },
                                render: 1,
                            }
                        };
                        const actual = isContainerDefineJson(test);

                        expect(actual).to.be.false;
                    });
                });
            })
        });
    });

    describe('isContainerDefineJsons', () => {
        describe('error case', () => {
            it('arguments not array', () => {
                const test = 1;
                const actual = isContainerDefineJsons(test);

                expect(actual).to.be.false;

            })
            it('invalid item', () => {
                const test = [
                    {
                        containerName: 'grid',
                        options: {
                            marker: ':',
                        }
                    },
                    1
                ];
                const actual = isContainerDefineJsons(test);

                expect(actual).to.be.false;

            });
            it('conflict containerName', () => {
                const test = [
                    {
                        containerName: 'grid',
                        options: {
                            marker: ':',
                        }
                    },
                    {
                        containerName: 'grid',
                        options: {
                            marker: '+',
                        }
                    }
                ];
                const actual = isContainerDefineJsons(test);

                expect(actual).to.be.false;

            })
            it('conflict marker', () => {
                const test = [
                    {
                        containerName: 'grid',
                        options: {
                            marker: ':',
                        }
                    },
                    {
                        containerName: 'grid-item',
                        options: {
                            marker: ':',
                        }
                    }
                ];
                const actual = isContainerDefineJsons(test);

                expect(actual).to.be.false;

            })
        })
    })
});
