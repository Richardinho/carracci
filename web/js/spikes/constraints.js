//we should be able to apply a constraint to a node.

//before it makes a movement in a particular direction , we have to make specified checks.


function moveNodeXDirection(newXPosition) {
    //  do checks then return true if move is allowed. false if it is not.

    var rules = getArrayOfRules();

    for (var i = 0; i < rules.length; i++) {
        if (!rules[i].check(newXPosition)) return false;
    }
    return true;
}

/*


  Each node should maintain an array of rules or constraints which govern which movements it is allowed to
  make. Whenever it attempts to move, we iterate through the rules. If the proposed movement breaks any of the
  given rules, the proposed movement will not be allowed.

  There are only two kinds of constraints: horizontal and vertical

*/