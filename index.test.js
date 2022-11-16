const { fetchGracePeriodLogicFromMapping,
        CutSpacesFrom,
        GetRelations } = require('./index.js')

describe('Format', () => {
  it('should remove spaces from source string', () => {
    expect(CutSpacesFrom(' qwerty ')).toBe('qwerty');
    expect(CutSpacesFrom(' base :124, 123 ; test :1234')).toBe('base:124,123;test:1234');
  });
});

describe('GetRelations', () => {
  it('should remove spaces from source string', () => {
    expect(GetRelations('base:124,123;test:1234')).toStrictEqual({
        nameToIds: { base: [124, 123], test: [1234] },
        idsToNames: { 1234: ['test'], 124: ['base'], 123: ['base'] }
    });
  });
});


describe('grace period utils', () => {
    it('should fetch logic name', () => {
        expect(fetchGracePeriodLogicFromMapping('123', 'base:124,123;test:1234;')).toBe(
            'base'
        )
    })

    it('should fetch logic name without ;', () => {
        expect(fetchGracePeriodLogicFromMapping('123', 'base:124,123;test:1234')).toBe(
            'base'
        )
    })

    it('should fetch logic name with spaces around ids', () => {
        expect(fetchGracePeriodLogicFromMapping('123', 'base:124, 123 ;test:1234')).toBe(
            'base'
        )
    })

    it('should fetch logic name with spaces in logic name', () => {
        expect(fetchGracePeriodLogicFromMapping('123', ' base :124, 123 ; test :1234')).toBe(
            'base'
        )
    })

    it('should fetch logic name with duplicates', () => {
        expect(fetchGracePeriodLogicFromMapping('123', 'base:124,123;test:123;')).toBe(
            'test'
        )
    })

    it('should fetch null', () => {
        expect(fetchGracePeriodLogicFromMapping('1243', 'test1:123;test2:444;')).toBe(
            null
        )
    })

    it('should fetch logic name from string', () => {
        expect(fetchGracePeriodLogicFromMapping('1231', 'test1:123;test2:444;'))
            .toBe(null)
    })
})
