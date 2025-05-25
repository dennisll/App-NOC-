import { LogEntity } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
import { CheckServiceMultiple } from './check-service-multiple';



describe( 'CheckService UseCase', () => {

  const mockMongoRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockPostgresRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockFileSystemRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const successCallback = jest.fn();
  const errorCallback = jest.fn();



  const checkService = new CheckServiceMultiple(
    successCallback,
    errorCallback,
    [mockFileSystemRepository, mockMongoRepository, mockPostgresRepository],
  );

  beforeEach(() =>{
    jest.clearAllMocks();
  })



  test( 'should call successCallback when fetch returns true', async () => {

    const wasOk = await checkService.execute( 'https://google.com' );
    
    expect( wasOk ).toBe( true );
    expect( successCallback ).toHaveBeenCalled()
    expect( errorCallback ).not.toHaveBeenCalled();

    expect( mockFileSystemRepository.saveLog ).toHaveBeenCalledWith(
      expect.any( LogEntity )
    );
    expect( mockMongoRepository.saveLog ).toHaveBeenCalledWith(
      expect.any( LogEntity )
    );
    expect( mockPostgresRepository.saveLog ).toHaveBeenCalledWith(
      expect.any( LogEntity )
    );

  } );

  test( 'should call errorCallback when fetch returns false', async () => {

    const wasOk = await checkService.execute( 'https://goasdfasdfasdfasdogle.com' );
    
    expect( wasOk ).toBe( false );
    expect( successCallback ).not.toHaveBeenCalled()
    expect( errorCallback ).toHaveBeenCalled();

    expect( mockFileSystemRepository.saveLog ).toHaveBeenCalledWith(
      expect.any( LogEntity )
    );
    expect( mockMongoRepository.saveLog ).toHaveBeenCalledWith(
      expect.any( LogEntity )
    );
    expect( mockPostgresRepository.saveLog ).toHaveBeenCalledWith(
      expect.any( LogEntity )
    );

  } );
} );