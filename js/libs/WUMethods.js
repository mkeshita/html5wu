class WUMethods
{
    // DOM

    static dom (tag, data)
    {
        const element = document.createElement(tag);
        const keys = Object.keys(data);

        for (let i = keys.length; i--;) element[keys[i]] = data[keys[i]];

        return element;
    }


    // Array

    static push (a, ...b)
    {
        for (let i = 0; i < b.length; i++) a[a.length] = b[i];

        return a;
    }

    static map (a, f)
    {
        const b = [];

        for (let i = a.length; i--;) b[i] = f(a[i]);

        return b;
    }

    static filter (a, f)
    {
        const b = [];

        for (let i = 0; i < a.length; i++) if (f(a[i])) b[b.length] = a[i];

        return b;
    }

    static every (a, f)
    {
        for (let i = a.length; i--;) if (!f(a[i])) return false;
        
        return true;
    }

    // if the comparing function returns true, the array elements are switched
    static sort (a, f)
    {
        const b = [...a];
    
        for (let i = 0; i < b.length - 1; i++)
        {
            if (f(b[i], b[i + 1]))
            {
                const z = b[i];
    
                b[i] = b[i + 1];
                b[i + 1] = z;
    
                i = -1;
            }
        }
    
        return b;
    }
}