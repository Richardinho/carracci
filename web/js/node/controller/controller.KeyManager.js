define(['jQuery', 'BaseType'],function ($, extend) {

    // This is a singleton, so we create an instance here and return it.
    var KeyManager =  extend.extend({

        initialize : function () {

            var that = this;

            $(document).keydown(function (event) {
                that._keyDown(event);
            });

            $(document).keyup(function (event) {
                that._keyUp(event);
            });
        },

        _keyDown : function (event) {
            this[this._map[String.fromCharCode(event.keyCode)]] = true;
        },

        _keyUp : function (event) {
            this[this._map[String.fromCharCode(event.keyCode)]] = false;
        },

        _map : {

            A : "A_KEY",
            B : "B_KEY",
            C : "C_KEY",
            D : "D_KEY",
            E : "E_KEY",
            F : "F_KEY",
            G : "G_KEY",
            H : "H_KEY",
            I : "I_KEY",
            J : "J_KEY",
            K : "K_KEY",
            L : "L_KEY",
            M : "M_KEY",
            N : "N_KEY",
            O : "O_KEY",
            P : "P_KEY",
            Q : "Q_KEY",
            R : "R_KEY",
            S : "S_KEY",
            T : "T_KEY",
            U : "U_KEY", //85
            V : "V_KEY",
            W : "W_KEY",
            X : "X_KEY",
            Y : "Y_KEY",
            Z : "Z_KEY"
        }
    });

    return new KeyManager();
});
