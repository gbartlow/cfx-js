# cfx.paths

Manipulation of string paths.

## join(paths...)

Joins any number of paths together, normalizing slashes (/ vs \\), and removing duplicate slashes.

Does not add or remove leading or trailing slashes.

    cfx.paths.join('/leading', 'trailing/');
    >> '/leading/trailing/'
    
    cfx.paths.join('leading', 'trailing');
    >> 'leading/trailing'
    
Will gracefully handle slashes in the middle of strings

    cfx.paths.join('le/ad/ing', 'tr/ailing');
    >> 'le/ad/ing/tr/ailing'
    
Removes duplicates.

    cfx.paths.join('le///ad//ing', 'tr//ailing');
    >> 'le/ad/ing/tr/ailing'
    
Normalizes all slashes to be forward facing.

    cfx.paths.join('le\ad\\ing', 'tr\\\ailing');
    >> 'le/ad/ing/tr/ailing'