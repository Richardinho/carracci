
Glenmorangie.nodeFactory = (function () {

    var canvas;

    //  constructor
    function Node(connector, x, y, id) {

        this.connector = connector;
        this.xCood = x; //  holds x cood state
        this.yCood = y; //  holds y cood state
        this.id = id;
        this.draggableElement = Glenmorangie.svgUtils.createCircle(canvas, x, y);
        this.listeners = [];
        this.constraintsManagers = [];
        this.startX; // temp x variable for use when moving
        this.startY; // temp y variable for use when moving

        this.draggableElement.click(function () {
            var currentKey = Glenmorangie.module.currentKey;
            if (currentKey != null && currentKey === 115) { // 's'
                //  change line type
                this.connector.updateLineMode();
            }
        }, this);
    }

    Node.prototype.render = function() {
        this.draggableElement.attr({ "cx" : this.xCood });
        this.draggableElement.attr({ "cy" : this.yCood });
        this.draggableElement.toFront();
    };

    Node.prototype.checkXRestrictions = function (x) {
        for (var i = 0; i < this.constraintsManagers.length; i++) {
            var result = this.constraintsManagers[i].proposeXCood(x);
            return result;
        }
        return true;
    };

    Node.prototype.checkYRestrictions = function (y) {
        for (var i = 0; i < this.constraintsManagers.length; i++) {
            var result = this.constraintsManagers[i].proposeYCood(y);
            return result;
        }
        return true;
    };

    Node.prototype.setCoods = function (x, y) {
        this.xCood = x;
        this.yCood = y;
    };

    Node.prototype.initialize = function () {

        var that = this,

            onMove = function (dx, dy) {
                var proposedX = that.startX + dx,
                    proposedY = that.startY + dy;

                var x = that.checkXRestrictions(proposedX) ? proposedX : that.xCood;
                var y = that.checkYRestrictions(proposedY) ? proposedY : that.yCood;

                that.updateCoordinates(x,y);
            },

            onstart = function () {
                that.startX = parseInt(that.draggableElement.attr("cx"));
                that.startY = parseInt(that.draggableElement.attr("cy"));
            },

            onend = function () {
                that.startX = null;
                that.startY = null;
            };

        this.draggableElement.drag(onMove, onstart, onend);

        return this;
    };

    Node.prototype.setConstraintsManager = function (manager) {
        this.constraintsManagers.push(manager);
    };

    Node.prototype.notifyListeners = function () {
        for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            listener.obj[listener.action]( this.xCood, this.yCood );
        }
    };

    Node.prototype.addListener = function (object, method) {
        this.listeners.push({ obj : object, action : method });
    };

    Node.prototype.horizontal = function (x, y) {
        this.setCoods(this.xCood, y);
    };

    Node.prototype.vertical = function (x, y) {
        this.setCoods(x, this.yCood);
    };

    Node.prototype.getX = function () {
        return this.xCood;
    };

    Node.prototype.getY = function () {
        return this.yCood;
    };

    Node.prototype.updateCoordinates = function (x, y) {
        this.xCood = x;
        this.yCood = y;
        this.notifyListeners();

        this.connector.renderAll();
    };

    Node.prototype.upDateX = function (x) {
        this.xCood = x;
    }

    Node.prototype.upDateY = function (y) {
        this.yCood = y;
    }

    function ArrowNode (connector, x, y, id, node, distalNode) {

        Node.call(this, connector, x, y, id);

        this.arrow = createArrow(this.xCood, this.yCood, canvas, this);
        this.partnerNode = node;
        this.paneToNodeLink = Glenmorangie.nodeToRectangleLinkFactory.createPaneToNodeLink(this, node, distalNode);

        this.draggableElement.click(function () {

            var currentKey = Glenmorangie.module.currentKey;

            if (currentKey != null && currentKey === 113) { //  'q'
                this.arrow.changeArrowHead();
                this.connector.renderAll();
            }

            if (currentKey != null && currentKey === 114) { // 'r'
                Glenmorangie.module.askingToAttachNode = this;
            }
        }, this);
    }
    // ToDo: modularize this
    Glenmorangie.utils.extend(Node, ArrowNode);

    ArrowNode.prototype.render = function () {

        this.setArrowDirection(this.partnerNode.getX());
        this.arrow.updateArrowHead(this.xCood, this.yCood);
        Node.prototype.render.call(this);
    }

    ArrowNode.prototype.getLink = function() {

        return this.paneToNodeLink;
    };

    ArrowNode.prototype.setArrowDirection = function (x, y) {

        if ( this.xCood > x) {
            this.arrow.setArrowDirection("right");
        } else {
            this.arrow.setArrowDirection("left");
        }
    };

    ArrowNode.prototype.upDateX = function (x) {
        this.xCood = x;
    }

    ArrowNode.prototype.upDateY = function (y) {
        this.yCood = y;
    }

    function NodeAdapter(node) {

        return {

            setConstraintsManager : function (manager) {
                node.setConstraintsManager(manager);
            },

            notifyListeners : function () {
                node.notifyListeners();
            },

            addListener : function (object, method) {
                node.addListener(object, method);
            },

            horizontal : function (x, y) {
                node.horizontal(x, y);
            },

            vertical : function (x, y) {
                node.vertical(x, y);
            },

            render : function () {
                node.render();
            },

            getId : function () {
                return node.id;
            },

            getX : function () {
                return node.getX();
            },

            getY : function () {
                return node.getY();
            },

            updateCoordinates : function (x, y) {
                node.updateCoordinates(x, y);
            },

            upCood : function (x, y) {

                node.upCood(x, y);
            }

        };
    }

    function arrowNodeAdapter(node) {

        return {

            setArrowDirection : function (x, y) {
                node.setArrowDirection(x, y);
            },

            getLink : function () {
                return node.getLink();
            },

            upDateX : function (x) {
                node.upDateX(x);
            },

            upDateY : function (y) {
                node.upDateY(y);
            },

            setConstraintsManager : function (manager) {
                node.setConstraintsManager(manager);
            },

            upCood : function (x, y) {

                node.upCood(x, y);
            },

            notifyListeners : function () {
                node.notifyListeners();
            },

            getId : function() {},

            addListener : function (object, method) {
                node.addListener(object, method);
            },

            horizontal : function (x, y) {
                node.horizontal(x, y);
            },

            vertical : function (x, y) {
                node.vertical(x, y);
            },

            render : function () {
                node.render();
            },

            getX : function () {
                return node.getX();
            },

            getY : function () {
                return node.getY();
            },

            updateCoordinates : function (x, y) {
                node.updateCoordinates(x, y);
            }
        };
    }

    return {

        // pass dependencies in on initialization
        initialize : function (c) {
            canvas = c;
            return this;
        },

        createNode : function (connector, x, y, id) {
            return NodeAdapter(new Node(connector, x, y, id).initialize());
        },

        createNodeWithArrow : function (connector, x, y, id, node, distalNode) {
            return arrowNodeAdapter(new ArrowNode(connector, x, y, id, node, distalNode).initialize());
        }

    }
})();